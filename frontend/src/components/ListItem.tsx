// ListItem.tsx (CORRIGIDO com ícone opcional)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  text: string;
  href: string;
  icon?: ReactNode; // ALTERAÇÃO: Propriedade 'icon' agora é opcional
};

export default function ListItem(props: Props) {
  const pathname = usePathname();
  const active = pathname === props.href;

  return (
    <li className="w-full">
      <Link
        href={props.href}
        // Mantemos 'flex items-center' para centralização vertical
        className={`w-full py-2 transition-colors flex items-center ${
          active ? "bg-emerald-700 text-white" : "text-emerald-100 hover:bg-emerald-700"
        }`}
      >
        {/*
          AJUSTE DE CLASSE:
          O 'gap-3' só é adicionado se props.icon existir.
        */}
        <span className={`px-6 flex items-center ${props.icon ? 'gap-3' : ''}`}>
          {props.icon}
          {props.text}
        </span>
      </Link>
    </li>
  );
}