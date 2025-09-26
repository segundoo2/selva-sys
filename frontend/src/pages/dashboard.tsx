import Head from "next/head";
import Card from "../components/Card";
import Nav from "../components/Nav";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard — SelvaSYS</title>
        <meta name="description" content="Página inicial do sistema" />
        <link rel="icon" href="/d1.svg" />
      </Head>

      <div className="bg-emerald-100 h-screen w-screen m-auto flex items-center justify-center">
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
            <section className="grid grid-cols-3 gap-6">
              <Card title="Usuários do Sistema" paragraph="10" />
              <Card title="Unidades" paragraph="4" />
              <Card title="Desbravadores" paragraph="20" />
              <Card title="Líderes" paragraph="5" />
            </section>
          </main>
        </section>
      </div>
    </>
  );
}
