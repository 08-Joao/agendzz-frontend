import { ChatDots, ClipboardList, Database, Home, Settings, Letter, Calendar, MoneyBag } from "@solar-icons/react/ssr";

interface ChildOption {
  name: string
  icon: React.ReactElement
  page: string
}


export interface CategoryOption {
  name: string
  icon: React.ReactElement
  page: string
  childs?: ChildOption[]
}

interface MenuOptions {
  [categoryName: string]: CategoryOption[]
}

export const sidebarOptions: MenuOptions = {
  "Comunicação": [
    {
      name: "Chats",
      icon: <ChatDots weight='BoldDuotone' size={20}/>,
      page: "/chats"
    },
    {
      name: "Mensagens Programadas",
      icon: <Letter weight='BoldDuotone' size={20}/>,
      page: "/mensagens"
    }
  ],
  "Organização": [
    {
      name: "Dashboard",
      icon: <Home weight='BoldDuotone' size={20} />,
      page: "/"
    },
    {
      name: "Agendamentos",
      icon: <ClipboardList weight='BoldDuotone' size={20}/>,
      page: "/agendamentos"
    },
    {
      name: "Pontos",
      icon: <Database weight='BoldDuotone' size={20}/>,
      page: "/pontos"
    },
    {
      name: "Produtos",
      icon: <MoneyBag weight='BoldDuotone' size={20}/>,
      page: "/produtos"
    },
    {
      name: "Calendário",
      icon: <Calendar weight='BoldDuotone' size={20}/>,
      page: "/calendario"
    },
    {
      name: "Configurações",
      icon: <Settings weight='BoldDuotone' size={20}/>,
      page: "/configuracoes",
      childs: [
        {
          name: "Preferências",
          icon: <Settings weight='BoldDuotone' size={16}/>,
          page: "/configuracoes/preferencias"
        },
        {
          name: "Usuários",
          icon: <Database weight='BoldDuotone' size={16}/>,
          page: "/configuracoes/usuarios"
        }
      ]
    }
  ]
}