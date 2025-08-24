export default interface CreateCadastroDbvDto {
  nome: string;
  idade: number;
  cpf: string;
  rg: string;
  cargo: string;
  unidade: string;
  nomeResponsavel: string;
  telefoneResponsavel: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  observacao?: string;
  createdAt: Date;
  updatedAt: Date;
}
