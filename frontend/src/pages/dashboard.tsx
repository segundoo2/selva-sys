// pages/dashboard.tsx (CORRIGIDO PARA USAR IDADE NUMÉRICA DA API)

import { useEffect, useState } from "react";
import { Users, Crown, User } from "lucide-react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { Title } from "../components/Title";
import api from "../utils/api";

// REMOVIDO: import { calculateAge } from "../utils/ageUtils";
// A idade já virá da API, simplificando o processo.

// --- Configuração e Tipagem ---

// Dados estáticos temporários
const UNITS_STATIC_COUNT = 4;

// Tipo de dados esperado da API de membros (AGORA COM 'idade' NUMÉRICA)
interface Member {
  id: string;
  nome: string;
  idade: number; // NOVO CAMPO: Idade já calculada pela API
}

// Tipo para armazenar as contagens finais do dashboard (MANTIDO)
interface DashboardData {
  unidades: number;
  desbravadores: number;
  lideres: number;
  loading: boolean;
}

// --- Funções de Consumo de API ---

/**
 * Busca todos os membros e os separa em Desbravadores e Líderes, usando o campo 'idade'.
 */
const fetchMembersAndCalculate = async (): Promise<{
  desbravadores: number;
  lideres: number;
}> => {
  try {
    console.log("DEBUG: Iniciando chamada à API de membros...");

    // Faz a chamada. A resposta do axios é um objeto com a propriedade 'data'.
    const membersResponse = await api.get<Member[]>("/cadastro-dbv/all");

    // Obtém o array de membros.
    const members: Member[] = membersResponse.data || [];

    console.log(`DEBUG: Total de registros recebidos: ${members.length}`);

    if (members.length === 0) {
      console.warn(
        "DEBUG: API retornou 0 membros ou o campo 'data' estava vazio."
      );
      return { desbravadores: 0, lideres: 0 };
    }

    let desbravadoresCount = 0;
    let lideresCount = 0;

    members.forEach((member, index) => {
      const age = member.idade; // <--- USANDO O CAMPO 'IDADE' DIRETAMENTE

      // DEBUG: Loga o primeiro membro e sua idade para conferência
      if (index === 0) {
        console.log(
          `DEBUG: Primeiro registro - Nome: ${member.nome}, Idade recebida: ${age}`
        );
      }

      // Lógica de segmentação:
      if (age >= 16) {
        lideresCount++;
      } else if (age >= 10) {
        // 10 a 15 anos = Desbravador
        desbravadoresCount++;
      }
      // Membros com menos de 10 anos são ignorados.
    });

    console.log(
      `DEBUG: Contagem FINAL - Desbravadores: ${desbravadoresCount}, Líderes: ${lideresCount}`
    );

    return { desbravadores: desbravadoresCount, lideres: lideresCount };
  } catch (e) {
    console.error(
      "DEBUG: FALHA CRÍTICA na API de membros. Verifique o endpoint e a conectividade.",
      e
    );
    return { desbravadores: 0, lideres: 0 };
  }
};

/**
 * PLACEHOLDER: Função para Unidades (Dados estáticos por enquanto).
 */
const fetchUnitsCount = async (): Promise<number> => {
  return UNITS_STATIC_COUNT;
};

// --- Componente Principal (MANTIDO) ---

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    unidades: 0,
    desbravadores: 0,
    lideres: 0,
    loading: true,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      setData((prev) => ({ ...prev, loading: true }));

      const { desbravadores, lideres } = await fetchMembersAndCalculate();
      const unidades = await fetchUnitsCount();

      setData({
        unidades,
        desbravadores,
        lideres,
        loading: false,
      });
    } catch (err: any) {
      console.error("Erro ao buscar dados do Dashboard:", err);
      setError(
        "Erro ao carregar os dados. Verifique a conexão com o servidor."
      );
      setData((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Layout
      title="dashboard"
      description="Visualização de métricas e dados sobre o clube"
    >
      <div className="mb-8">
        <Title text="Dashboard" />
      </div>

      {/* Exibição de Loading ou Erro */}
      {data.loading && (
        <p className="text-emerald-600 text-lg">Carregando métricas...</p>
      )}
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>
      )}

      {/* Grid de Cartões */}
      {!data.loading && (
        <div className="flex w-full justify-center">
        {/* Grid de Cartões */}
        {!data.loading && (
          <section
            // Largura máxima para que os cards não se espalhem indefinidamente.
            // Removi 'mx-auto' e usei 'flex justify-center' no pai.
            className="
                grid 
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                gap-6 
                max-w-screen-xl" 
          >
            <Card
              title="Unidades"
              paragraph={`${data.unidades} unidades ativas`}
              icon={<Users size={24} />}
              style="w-full h-32 bg-emerald-800 rounded-xl shadow-xl p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]"
            />

            <Card
              title="Desbravadores"
              paragraph={`${data.desbravadores} membros juvenis`}
              icon={<User size={24} />}
              style="w-full h-32 bg-emerald-800 rounded-xl shadow-xl p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]"
            />

            <Card
              title="Líderes"
              paragraph={`${data.lideres} Lideres`}
              icon={<Crown size={24} />}
              style="w-full h-32 bg-emerald-800 rounded-xl shadow-xl p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]"
            />
          </section>
        )}
      </div>
      )}
    </Layout>
  );
}
