'use client'

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
    use
} from 'react'
import { Organization } from '@/dtos/organization.dto'
import Api from '@/services/Api' // Seu serviço de API

// Define o tipo de dado que o contexto irá prover
interface OrganizationContextType {
    organizations: Organization[]
    selectedOrganization: Organization | null
    isLoading: boolean
    selectOrganization: (organizationId: string) => void
}

// Cria o contexto
const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

// Chave para usar no localStorage
const LOCAL_STORAGE_KEY = 'selectedOrganizationId'

// Componente Provedor que encapsulará a lógica
export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [userOrgs, setUserOrgs] = useState<Organization[]>([])

    useEffect(() => {
        const initializeOrganizations = async () => {
            setIsLoading(true)
            try {
                // 1. Busca as organizações do usuário no backend
                // Usei `getUserOrganizations` pois parece mais apropriado que `getUserNotifications`
                const response = await Api.getUserOrganizations()
                if(response && response.data) {
                    setOrganizations(response.data)
                    setUserOrgs(response.data)
                }else{ 
                    return
                }
                
                if (userOrgs.length > 0) {
                    // 2. Tenta obter o ID da organização salva no localStorage
                    const storedOrgId = localStorage.getItem(LOCAL_STORAGE_KEY)
                    let orgToSelect: Organization | undefined = undefined

                    if (storedOrgId) {
                        // 3. Valida se a organização salva ainda existe na lista do backend
                        orgToSelect = userOrgs.find((org: Organization) => org.id === storedOrgId)
                    }

                    // 4. Se não houver ID salvo ou se for inválido, seleciona a primeira organização da lista como padrão
                    if (!orgToSelect) {
                        orgToSelect = userOrgs[0];
                    }

                    // 5. Define a organização selecionada e atualiza o localStorage com o valor correto
                    if (orgToSelect) {
                        setSelectedOrganization(orgToSelect as Organization | null);
                        localStorage.setItem(LOCAL_STORAGE_KEY, orgToSelect.id)
                    }
                } else {
                    // Caso o usuário não tenha nenhuma organização
                    setSelectedOrganization(null)
                    localStorage.removeItem(LOCAL_STORAGE_KEY)
                }
            } catch (error) {
                console.error("Falha ao carregar as organizações:", error)
                // Limpa o estado em caso de erro
                setOrganizations([])
                setSelectedOrganization(null)
                localStorage.removeItem(LOCAL_STORAGE_KEY)
            } finally {
                setIsLoading(false)
            }
        }

        initializeOrganizations()
    }, [userOrgs]) // O array vazio garante que isso rode apenas uma vez, quando o componente é montado

    // Função para permitir que outros componentes alterem a organização selecionada
    const selectOrganization = useCallback((organizationId: string) => {
        const newSelectedOrg = organizations.find(org => org.id === organizationId)

        if (newSelectedOrg) {
            setSelectedOrganization(newSelectedOrg)
            localStorage.setItem(LOCAL_STORAGE_KEY, newSelectedOrg.id)
        } else {
            console.warn(`Organização com ID "${organizationId}" não encontrada.`)
        }
    }, [organizations])

    // O valor que será provido para os componentes filhos
    const value = {
        organizations,
        selectedOrganization,
        isLoading,
        selectOrganization,
    }

    return (
        <OrganizationContext.Provider value={value}>
            {children}
        </OrganizationContext.Provider>
    )
}

// Hook customizado para facilitar o uso do contexto
export const useOrganization = () => {
    const context = useContext(OrganizationContext)
    if (context === undefined) {
        throw new Error('useOrganization deve ser usado dentro de um OrganizationProvider')
    }
    return context
}