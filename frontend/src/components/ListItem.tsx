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
    <li>
      <Link
        href={props.href}
        className={`block px-6 py-1 ${
          active ? "bg-emerald-700 text-white" : "text-emerald-100"
        }`}
      >
        {props.text}
      </Link>
    </li>
  );
}
