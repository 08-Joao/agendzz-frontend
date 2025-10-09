// 'use client'
// import Layout from '@/components/layout/Layout'
// import { Button } from '@/components/ui/button'
// import { weekDays } from '@/constants/WeekDays'
// import { useOrganization } from '@/context/OrganizationContext'
// import { CreateAvailabilityDto } from '@/dtos/create.availability.dto'
// import { AvailabilityEntity } from '@/entities/availability.entity'
// import { Point } from '@/entities/point.entity'
// import Api from '@/services/Api'
// import { Plus } from 'lucide-react'
// import React, { use, useEffect, useState } from 'react'

// function Availability() {
//   const [points, setPoints] = useState<Point[]>([])
//   const [currentPoint, setCurrentPoint] = useState<Point | null>(null)
//   const { selectedOrganization } = useOrganization()
//   const [currentAvailability, setCurrentAvailability] = useState<AvailabilityEntity[]>([])
//   const [availabilityToCreate, setAvailabilityToCreate] = useState<CreateAvailabilityDto[]>([])

//   useEffect(() => {
//     const fetchPoints = async () => {
//       if(selectedOrganization){
//         const response = await Api.getOranizationPoints(selectedOrganization.id)
        
//         if(response && response.data){
//           setPoints(response.data)
//         }
//       }
//     }

//     fetchPoints()
//   }, [])

//   useEffect(() => {
//     if(currentPoint){
//       const fetchAvailability = async () => {
//         if(currentPoint){
//           const response = await Api.getPointAvailabilityTimes(selectedOrganization!.id, currentPoint.id)
//           if(response && response.data){
//             setCurrentAvailability(response.data)
//           }
//         }
//       }
//       fetchAvailability()
//     }
//   },[currentPoint])

//   return (
//     <Layout>
//       <div className="flex justify-between gap-2">
//         {weekDays.map((day) => (
//           <div key={day.value} className="w-full h-screen bg-elevation-1 rounded-sm flex items-center p-2 gap-2 flex-col">

//             {currentPoint !== null ? (
//               <>
//                 <span className='text-xg font-bold w-full flex justify-center'>{day.label}</span>
//                 {currentAvailability
//                   .filter((availability) => availability.dayOfWeek === day.value)
//                   .map((availability) => (
//                     <div key={availability.id} className="flex items-center gap-2">
//                       <span>{availability.startTime}</span>
//                       <span>-</span>
//                       <span>{availability.endTime}</span>
//                     </div>
//                   ))}
//                 <Button variant="ghost" className='cursor-pointer w-full flex items-center justify-center'>
//                   <Plus size={24} />Novo Horário
//                 </Button>
//               </>
//             ) : (
//               <span className='text-xg font-bold w-full flex justify-center'>Selecione um ponto</span>
//             )}

//           </div>
//         ))}
//       </div>
//     </Layout>
//   )
// }

// export default Availability
'use client'
import React, { useEffect, useState } from 'react'
import { Plus, X, Save, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button';

// Types
interface CreateAvailabilityDto {
  pointId: string;
  dayOfWeek: number;
  startTime: number;
  endTime: number;
}

interface AvailabilityEntity {
  readonly id: string;
  readonly pointId: string;
  readonly dayOfWeek: number;
  readonly startTime: number;
  readonly endTime: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

interface Point {
  readonly id: string;
  readonly name: string;
  readonly organizationId: string;
}

const Select = ({ value, onChange, children, className = '' }: any) => (
  <select 
    value={value} 
    onChange={onChange}
    className={`bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  >
    {children}
  </select>
)

const Input = ({ type = 'text', value, onChange, placeholder, className = '' }: any) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
)

// Função para converter minutos em HH:MM
const minutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

// Função para converter HH:MM em minutos
const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const weekDays = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' }
]

function Availability() {
  // Mock data - substitua pelos seus dados reais
  const [points] = useState<Point[]>([
    { id: '1', name: 'Ponto Centro', organizationId: '1' },
    { id: '2', name: 'Ponto Norte', organizationId: '1' },
    { id: '3', name: 'Ponto Sul', organizationId: '1' }
  ])
  
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null)
  const [currentAvailability, setCurrentAvailability] = useState<AvailabilityEntity[]>([])
  const [showCreateForm, setShowCreateForm] = useState<number | null>(null)
  const [newAvailability, setNewAvailability] = useState({
    startTime: '08:00',
    endTime: '18:00'
  })

  const handlePointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const point = points.find(p => p.id === e.target.value)
    setCurrentPoint(point || null)
    setShowCreateForm(null)
  }

  const handleCreateAvailability = (dayOfWeek: number) => {
    if (!currentPoint) return

    const startMinutes = timeToMinutes(newAvailability.startTime)
    const endMinutes = timeToMinutes(newAvailability.endTime)

    if (startMinutes >= endMinutes) {
      alert('Horário de início deve ser menor que o horário de fim')
      return
    }

    const newEntry: AvailabilityEntity = {
      id: Date.now().toString(),
      pointId: currentPoint.id,
      dayOfWeek,
      startTime: startMinutes,
      endTime: endMinutes,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setCurrentAvailability([...currentAvailability, newEntry])
    setShowCreateForm(null)
    setNewAvailability({ startTime: '08:00', endTime: '18:00' })
    
    // Aqui você faria a chamada API real:
    // await Api.createAvailability(selectedOrganization.id, currentPoint.id, dto)
  }

  const handleDeleteAvailability = (id: string) => {
    setCurrentAvailability(currentAvailability.filter(a => a.id !== id))
    // Aqui você faria a chamada API real:
    // await Api.deleteAvailability(selectedOrganization.id, currentPoint.id, id)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header com seleção de ponto */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold">Gerenciar Disponibilidade</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="text-gray-300 font-medium">Selecione o Ponto:</label>
          <Select 
            value={currentPoint?.id || ''} 
            onChange={handlePointChange}
            className="min-w-[200px]"
          >
            <option value="">-- Selecione um ponto --</option>
            {points.map(point => (
              <option key={point.id} value={point.id}>
                {point.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Grid de dias da semana */}
      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day) => (
          <div 
            key={day.value} 
            className="bg-gray-800 rounded-lg p-4 flex flex-col gap-3 min-h-[400px]"
          >
            <h2 className="text-lg font-bold text-center border-b border-gray-700 pb-2">
              {day.label}
            </h2>

            {currentPoint ? (
              <>
                {/* Lista de disponibilidades existentes */}
                <div className="flex-1 space-y-2">
                  {currentAvailability
                    .filter((availability) => availability.dayOfWeek === day.value)
                    .map((availability) => (
                      <div 
                        key={availability.id} 
                        className="bg-gray-700 rounded-md p-3 flex items-center justify-between hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {minutesToTime(availability.startTime)} - {minutesToTime(availability.endTime)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteAvailability(availability.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                </div>

                {/* Formulário de criação */}
                {showCreateForm === day.value ? (
                  <div className="bg-gray-700 rounded-md p-3 space-y-3">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-gray-400">Início</label>
                      <Input
                        type="time"
                        value={newAvailability.startTime}
                        onChange={(e: any) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-gray-400">Fim</label>
                      <Input
                        type="time"
                        value={newAvailability.endTime}
                        onChange={(e: any) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCreateAvailability(day.value)}
                        className="flex-1 flex items-center justify-center gap-1"
                      >
                        <Save size={16} />
                        Salvar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateForm(null)}
                        className="px-3"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setShowCreateForm(day.value)}
                    className="w-full flex items-center justify-center gap-2 mt-auto"
                  >
                    <Plus size={18} />
                    Novo Horário
                  </Button>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 text-sm text-center">
                Selecione um ponto para gerenciar disponibilidade
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Availability