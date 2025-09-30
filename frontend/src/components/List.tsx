// List.tsx (COM ÍCONES)
import ListItem from "./ListItem";

// Importa os ícones do lucide-react
import {
  LayoutDashboard,
  Users,
  DollarSign, // Para Finanças
  Gavel, // Para Patrimônio (se for registro)
  PieChart, // Para Relatórios
  ClipboardList,
  Crown,
  User, // Para Secretaria
} from "lucide-react";

export default function List() {

    // Definindo o tamanho dos ícones
    const iconSize = 18;

  return (
     <ul 
        className="flex flex-col gap-1 h-full w-full text-emerald-100 justify-start"
        // Reduzi o gap de 4 para 1 para um visual mais coeso com os ícones
     > 
        <ListItem 
            text="Dashboard" 
            href="/dashboard" 
            icon={<LayoutDashboard size={iconSize} />} // Ícone para Dashboard
        />
        <ListItem 
            text="Lideres" 
            href="/users" 
            icon={<Crown size={iconSize} />} // Ícone para Usuários
        />
        <ListItem 
            text="Desbravadores" 
            href="/desbravadores" 
            icon={<User size={iconSize} />} // Ícone para Desbravadores
        />
        <ListItem 
            text="Unidades" 
            href="/unidades" 
            icon={<Users size={iconSize} />} // Ícone para Unidades
        />
        <ListItem 
            text="Finanças" 
            href="/financas" 
            icon={<DollarSign size={iconSize} />} // Ícone para Finanças
        />
        <ListItem 
            text="Secretaria" 
            href="/secretaria"
            icon={<ClipboardList size={iconSize} />} // Ícone para Secretaria
        />
        <ListItem 
            text="Patrimônio" 
            href="/patrimonio"
            icon={<Gavel size={iconSize} />} // Ícone para Patrimônio
        />
        <ListItem 
            text="Relatórios" 
            href="/relatorios"
            icon={<PieChart size={iconSize} />} // Ícone para Relatórios
        />
      </ul>
  )
}