import Head from "next/head";
import Nav from "../components/Nav";
import api from "../utils/api";
import { Edit, Trash2 } from "lucide-react";
import { GenericTable } from "../components/GenericTable";
import Link from "next/link";

type Users = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Props = {
  users: Users[];
};

export default function User({ users }: Props) {
  return (
    <>
      <Head>
        <title>Painel de usuários — SelvaSYS</title>
        <meta
          name="description"
          content="Página de administração de usuários"
        />
        <link rel="icon" href="/d1.svg" />
      </Head>

      <div className="bg-emerald-100 h-screen w-screen m-auto flex items-center justify-center">
        <section className="flex items-start justify-start w-5xl h-10/12 bg-white rounded-lg shadow-lg overflow-hidden">
          <Nav />

          <main className="my-5 mx-5 gap-6 w-full h-full">
            <section className="flex items-center justify-between mb-10">
              <h1 className="text-4xl font-bold text-emerald-800">Usuários</h1>
              <Link href="/users/register-user">
                <button className="bg-emerald-800 text-emerald-100 font-bold rounded-md w-40 h-10">
                  Cadastrar Usuário
                </button>
              </Link>
            </section>

            <GenericTable
              data={users}
              columnsNames={["Nome", "Email", "Nível de Acesso"]}
              columnsKeys={["name", "email", "role"]}
              actions={(user) => (
                <div className="flex gap-4 justify-center">
                  <button className="text-emerald-600 hover:text-emerald-800">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            />
          </main>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await api.get("/admin");
    const users: Users[] = Array.isArray(response.data) ? response.data : [];

    return {
      props: { users },
    };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return {
      props: { users: [] },
    };
  }
}
