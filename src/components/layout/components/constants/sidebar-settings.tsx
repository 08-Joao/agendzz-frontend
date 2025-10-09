import { ChatDots, ClipboardList, Database, Home, Settings, Letter, Calendar, MoneyBag, Widget, AlarmTurnOff, AlarmAdd } from "@solar-icons/react/ssr";

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
      name: "Pontos",
      icon: <Widget weight='BoldDuotone' size={20}/>,
      page: "/points",
      childs: [
        {
          name: "Disponibilidade",
          icon: <AlarmAdd weight='BoldDuotone' size={16}/>,
          page: "/points/availability"
        },
        {
          name: "Exceções",
          icon: <AlarmTurnOff weight='BoldDuotone' size={16}/>,
          page: "/points/exceptions"
        }
      ]
    },
    {
      name: "Produtos",
      icon: <MoneyBag weight='BoldDuotone' size={20}/>,
      page: "/products"
    },
    {
      name: "Agendamentos",
      icon: <Calendar weight='BoldDuotone' size={20}/>,
      page: "/appoinments"
    },
  ]
}