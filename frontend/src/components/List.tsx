// List.tsx (CORRIGIDO)
import ListItem from "./ListItem";

export default function List() {
  return (
     <ul 
        className="flex flex-col gap-4 h-full w-full text-emerald-100 justify-start" // <-- Classe ORIGINAL
     > 
     {/* Para preencher a altura, você deve usar justify-between ou justify-evenly 
        e remover o 'gap-4' se quiser distribuição uniforme.
        
        OPÇÃO 1 (Recomendada): Distribuição uniforme dos itens.
        Altere a classe para:
        className="flex flex-col h-full w-full text-emerald-100 justify-evenly" 

        OPÇÃO 2: Se quiser manter o 'gap-4' e apenas empurrar para baixo, use flex-grow nos LI's, 
                 mas isso pode complicar.

        Vamos manter o 'gap-4' e usar 'justify-start', mas o problema é a altura dos LI's. 
        O erro está no ListItem.
     */}
        <ListItem text="Dashboard" href="/dashboard" />
        <ListItem text="Usuários" href="/users" />
        <ListItem text="Desbravadores" href="/desbravadores" />
        <ListItem text="Unidades" href="/unidades" />
        <ListItem text="Finanças" href="/financas" />
        <ListItem text="Secretaria" href="/secretaria"/>
        <ListItem text="Patrimônio" href="/patrimonio"/>
        <ListItem text="Relatórios" href="/relatorios"/>
      </ul>
  )
}