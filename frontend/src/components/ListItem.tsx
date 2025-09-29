// ListItem.tsx (CORRIGIDO)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  text: string;
  href: string;
};

export default function ListItem(props: Props) {
  const pathname = usePathname();
  const active = pathname === props.href;

  return (
    // CHAVE: Adicionamos w-full para garantir que o <li> ocupe toda a largura do <ul>
    <li className="w-full"> 
      <Link
        href={props.href}
        // Movemos o padding horizontal (px-6) para o <li> pai 
        // e o Link ocupa 100% da largura do <li>.
        className={`w-full block py-1 transition-colors ${ 
          active ? "bg-emerald-700 text-white" : "text-emerald-100 hover:bg-emerald-700"
        }`}
      >
        <span className="px-6">{props.text}</span> {/* Adicionamos o padding dentro do span */}
      </Link>
    </li>
  );
}