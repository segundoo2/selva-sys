// pages/desbravadores.tsx
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Layout from "../components/Layout";
import { Title } from "../components/Title";
import Modal from "../components/Modal";
import GenericForm from "../components/GenericForm";
import InputField from "../components/InputField";
import Message from "../components/Message";
import ConfirmModal from "../components/ConfirmModal";
import api from "../utils/api";
import DesbravadorForm from "../components/DesbravadorForm";
import DesbravadoresTable from "../components/DesbravadoresTable";

// --- Tipo completo usado em toda a página e tabela ---
export interface Desbravador {
  matricula: number;
  nome: string;
  idade: number;
  cpf: string;
  rg: string;
  cargo: string;
  unidade: string;
  classes?: string[];
  especialidades?: string[];
  nomeResponsavel: string;
  telefoneResponsavel: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  observacao?: string;
}

// --- Hook debounce ---
function useDebounce<T>(value: T, delay = 300) {
  const [v, setV] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function DesbravadoresPage({
  desbravadores: initialDesbravadores,
}: {
  desbravadores: Desbravador[];
}) {
  const [desbravadores, setDesbravadores] =
    useState<Desbravador[]>(initialDesbravadores);
  const [search, setSearch] = useState("");
  const q = useDebounce(search, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDesbravador, setEditingDesbravador] =
    useState<Desbravador | null>(null);

  const [formData, setFormData] = useState<Partial<Desbravador>>({
    matricula: undefined,
    nome: "",
    idade: undefined,
    cpf: "",
    rg: "",
    cargo: "",
    unidade: "",
    classes: [],
    especialidades: [],
    nomeResponsavel: "",
    telefoneResponsavel: "",
    rua: "",
    numero: undefined,
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    observacao: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [modalMessage, setModalMessage] = useState("");
  const [modalError, setModalError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] =
    useState<Desbravador | null>(null);

  const fetchDesbravadores = async () => {
    try {
      const res = await api.get("/cadastro-dbv/all");
      setDesbravadores(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDesbravadores();
  }, []);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return desbravadores;
    return desbravadores.filter(
      (d) =>
        d.nome?.toLowerCase().includes(qq) ||
        d.cpf?.toLowerCase().includes(qq) ||
        d.cargo?.toLowerCase().includes(qq) ||
        d.unidade?.toLowerCase().includes(qq) ||
        d.matricula?.toString().includes(qq)
    );
  }, [q, desbravadores]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const openCreate = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setEditingDesbravador(null);
    setFormData({
      matricula: undefined,
      nome: "",
      idade: undefined,
      cpf: "",
      rg: "",
      cargo: "",
      unidade: "",
      classes: [],
      especialidades: [],
      nomeResponsavel: "",
      telefoneResponsavel: "",
      rua: "",
      numero: undefined,
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      observacao: "",
    });
    setFieldErrors({});
    setModalMessage("");
    setModalError("");
  };

  const openEdit = (d: Desbravador) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingDesbravador(d);
    setFormData({ ...d });
    setFieldErrors({});
    setModalMessage("");
    setModalError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDesbravador(null);
    setIsEditing(false);
    setFormData({
      matricula: undefined,
      nome: "",
      idade: undefined,
      cpf: "",
      rg: "",
      cargo: "",
      unidade: "",
      classes: [],
      especialidades: [],
      nomeResponsavel: "",
      telefoneResponsavel: "",
      rua: "",
      numero: undefined,
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      observacao: "",
    });
    setFieldErrors({});
    setModalMessage("");
    setModalError("");
  };

  const tryDelete = (d: Desbravador) => {
    setCandidateToDelete(d);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!candidateToDelete) return setConfirmOpen(false);
    setConfirmOpen(false);
    try {
      await api.delete(`/cadastro-dbv/${candidateToDelete.matricula}`);
      await fetchDesbravadores();
      setModalMessage("Desbravador excluído com sucesso!");
    } catch (err: any) {
      setModalError(
        err?.response?.data?.message || "Erro ao excluir desbravador"
      );
    } finally {
      setCandidateToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalMessage("");
    setModalError("");
    setFieldErrors({});
    const payload = {
      matricula: Number(formData.matricula),
      nome: formData.nome?.trim(),
      idade: Number(formData.idade),
      cpf: formData.cpf?.trim(),
      rg: formData.rg?.trim(),
      cargo: formData.cargo?.trim(),
      unidade: formData.unidade?.trim(),
      classes: formData.classes || [],
      especialidades: formData.especialidades || [],
      nomeResponsavel: formData.nomeResponsavel?.trim(),
      telefoneResponsavel: formData.telefoneResponsavel?.trim(),
      rua: formData.rua?.trim(),
      numero: Number(formData.numero),
      bairro: formData.bairro?.trim(),
      cidade: formData.cidade?.trim(),
      estado: formData.estado?.trim(),
      cep: formData.cep?.trim(),
      observacao: formData.observacao?.trim() || undefined,
    };

    try {
      if (isEditing && editingDesbravador) {
        await api.put(`/cadastro-dbv/${editingDesbravador.matricula}`, payload);
        setModalMessage("Desbravador atualizado com sucesso!");
      } else {
        await api.post("/cadastro-dbv", payload);
        setModalMessage("Desbravador cadastrado com sucesso!");
      }
      await fetchDesbravadores();
      setTimeout(() => closeModal(), 1500);
    } catch (err: any) {
      const be = err?.response?.data?.message;
      setModalError(
        Array.isArray(be)
          ? be.join(", ")
          : be || err.message || "Erro desconhecido"
      );
    }
  };

  useEffect(() => {
    if (!modalMessage && !modalError) return;
    const t = setTimeout(() => {
      setModalMessage("");
      setModalError("");
    }, 3500);
    return () => clearTimeout(t);
  }, [modalMessage, modalError]);

  return (
    <Layout title="Desbravadores" description="Gerenciamento de desbravadores">
      <section className="flex items-center justify-between mb-4">
        <Title text="Gerenciar Desbravadores" />
        <button
          className="bg-emerald-800 text-emerald-100 font-bold rounded-md px-6 h-10 hover:bg-emerald-900 transition-colors"
          onClick={openCreate}
        >
          Cadastrar Desbravador
        </button>
      </section>

      <section className="flex justify-start mb-4">
        <div className="w-64">
          <InputField
            type="text"
            placeholder="Pesquisar (nome, CPF, cargo...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={16} className="text-emerald-600" />}
          />
        </div>
      </section>

      <DesbravadoresTable
        desbravadores={filtered}
        onEdit={openEdit}
        onDelete={tryDelete}
      />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Editar Desbravador" : "Cadastrar Desbravador"}
        size="scroll-lg"
        footer={
          <section className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="desbravador-form"
              className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-900"
            >
              {isEditing ? "Atualizar" : "Salvar"}
            </button>
          </section>
        }
      >
        <GenericForm
          id="desbravador-form"
          onSubmit={handleSubmit}
          className="space-y-2"
        >
          <DesbravadorForm
            formData={formData}
            fieldErrors={fieldErrors}
            handleChange={handleChange}
            isEditing={isEditing}
          />
        </GenericForm>
        <section className="mt-1 flex flex-col gap-2 items-center">
          {modalMessage && <Message message={modalMessage} variant="success" />}
          {modalError && <Message message={modalError} variant="error" />}
        </section>
      </Modal>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        description={`Tem certeza que deseja excluir o desbravador ${candidateToDelete?.nome}?`}
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await api.get("/cadastro-dbv/all");
    return {
      props: { desbravadores: Array.isArray(res.data) ? res.data : [] },
    };
  } catch (err) {
    console.error(err);
    return { props: { desbravadores: [] } };
  }
}
