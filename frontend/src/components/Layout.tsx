import Head from "next/head";
import { ReactNode } from "react";
import Nav from "./Nav"; 

type LayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} — SelvaSYS</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/d1.svg" />
      </Head>

      <div className="
      bg-emerald-100 
      min-h-screen 
      w-screen 
      p-5 
      flex 
      justify-center 
      items-start 
      ">
        <section
          className="
            flex
            w-full 
            max-w-7xl
            min-h-[calc(100vh-40px)] 
            max-h-[calc(100vh-40px)]
            bg-white 
            rounded-lg 
            shadow-lg 
            overflow-hidden 
          "
        >
          {/* 1. Navegação Estática */}
          <Nav />

          {/* 2. Área de Conteúdo Principal (CHAVE: Garante a largura total disponível) */}
          <main className="
            w-full // CHAVE: Ocupa 100% da largura restante
            p-6 
            overflow-y-auto 
            h-full
            min-w-0 // Essencial para evitar o vazamento horizontal em tabelas
          ">
            {children}
          </main>
        </section>
      </div>
    </>
  );
}