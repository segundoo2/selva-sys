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
      h-screen 
      w-screen 
      m-auto 
      flex 
      items-center 
      justify-center">
        <section
          className="
            flex items-start 
            justify-start 
            w-5xl 
            h-10/12 
            bg-white 
            rounded-lg 
            shadow-lg 
            overflow-hidden"
        >
          <Nav />

          <main className="my-5 mx-5 gap-6 w-full h-full">
            {children}
          </main>
        </section>
      </div>
    </>
  );
}