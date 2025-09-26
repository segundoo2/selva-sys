import { usePathname } from "next/navigation";
import ListItem from "./ListItem";

export default function List() {
  return (
     <ul className="flex flex-col gap-4 mt-10 w-full text-emerald-100">
        <ListItem text="Dashboard" href="/dashboard" />
        <ListItem text="Usuários" href="/usuarios" />
        <ListItem text="Membros" href="/membros" />
        <ListItem text="Unidades" href="/unidades" />
        <ListItem text="Finanças" href="/financas" />
        <ListItem text="Secretaria" href="/secretaria"/>
        <ListItem text="Patrimônio" href="/patrimonio"/>
        <ListItem text="Relatórios" href="/relatorios"/>
      </ul>
  )
}