import { IsInt, IsNegative, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator";

export default class CreateCadastroDbvDto {
  @IsString({ message: 'Nome é obrigatório.' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  nome:                string;

  @IsInt({ message: 'Idade é obrigatória.' })
  @IsNotEmpty({ message: 'Idade não pode ser vazia.' })
  @Min(10, { message: 'Idade deve ser maior ou igual a 10 anos.' })
  idade:               number;

  @IsString({ message: 'CPF é obrigatório.' })
  @IsNotEmpty({ message: 'CPF não pode ser vazio.' })
  cpf:                 string;

  @IsString({ message: 'RG é obrigatório.' })
  @IsNotEmpty({ message: 'RG não pode ser vazio.' })
  rg:                  string;

  @IsString({ message: 'Cargo é obrigatório.' })
  @IsNotEmpty({ message: 'Cargo não pode ser vazio.' })
  cargo:               string;

  @IsString({ message: 'Unidade é obrigatória.' })
  @IsNotEmpty({ message: 'Unidade não pode ser vazia.' })
  unidade:             string;

  classes?:            string[];
  especialidades?:     string[];

  @IsString({ message: 'Nome do responsável é obrigatório.' })
  @IsNotEmpty({ message: 'Nome do responsável não pode ser vazio.' })
  nomeResponsavel:     string;

  @IsString({ message: 'Telefone do responsável é obrigatório.' })
  @IsNotEmpty({ message: 'Telefone do responsável não pode ser vazio.' })
  telefoneResponsavel: string;

  @IsString({ message: 'Rua é obrigatória.' })
  @IsNotEmpty({ message: 'Rua não pode ser vazia.' })
  rua:                 string;

  @IsInt({ message: 'Número é obrigatório.' })
  @IsNotEmpty({ message: 'Número não pode ser vazio.' })
  @IsPositive({ message: 'Número deve ser positivo.' })
  numero:              number;

  @IsString({ message: 'Bairro é obrigatório.' })
  @IsNotEmpty({ message: 'Bairro não pode ser vazio.' })
  bairro:              string;

  @IsString({ message: 'Cidade é obrigatória.' })
  @IsNotEmpty({ message: 'Cidade não pode ser vazia.' })
  cidade:              string;

  @IsString({ message: 'Estado é obrigatório.' })
  @IsNotEmpty({ message: 'Estado não pode ser vazio.' })
  estado:              string;

  @IsString({ message: 'CEP é obrigatório.' })
  @IsNotEmpty({ message: 'CEP não pode ser vazio.' })
  cep:                 string;

  @IsOptional()
  observacao?:         string;
}

export class UpdateCadastroDbvDto {
  @IsInt({ message: 'Matrícula é obrigatória.' })
  @IsNotEmpty({ message: 'Matrícula não pode ser vazia.' })
  matricula?:           number;

  @IsString({ message: 'Nome é obrigatório.' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  nome?:                string;

  @IsInt({ message: 'Idade é obrigatória.' })
  @IsNotEmpty({ message: 'Idade não pode ser vazia.' })
  @Min(9, { message: 'Idade deve ser maior ou igual a 9.' })
  idade?:               number;

  @IsString({ message: 'CPF é obrigatório.' })
  @IsNotEmpty({ message: 'CPF não pode ser vazio.' })
  cpf?:                 string;

  @IsString({ message: 'RG é obrigatório.' })
  @IsNotEmpty({ message: 'RG não pode ser vazio.' })
  rg?:                  string;

  @IsString({ message: 'Cargo é obrigatório.' })
  @IsNotEmpty({ message: 'Cargo não pode ser vazio.' })
  cargo?:               string;

  @IsString({ message: 'Unidade é obrigatória.' })
  @IsNotEmpty({ message: 'Unidade não pode ser vazia.' })
  unidade?:             string;

  classes?:            string[];
  especialidades?:     string[];

  @IsString({ message: 'Nome do responsável é obrigatório.' })
  @IsNotEmpty({ message: 'Nome do responsável não pode ser vazio.' })
  nomeResponsavel?:     string;

  @IsString({ message: 'Telefone do responsável é obrigatório.' })
  @IsNotEmpty({ message: 'Telefone do responsável não pode ser vazio.' })
  telefoneResponsavel: string;

  @IsString({ message: 'Rua é obrigatória.' })
  @IsNotEmpty({ message: 'Rua não pode ser vazia.' })
  rua?:                 string;

  @IsInt({ message: 'Número é obrigatório.' })
  @IsNotEmpty({ message: 'Número não pode ser vazio.' })
  @IsNegative({ message: 'Número deve ser positivo.' })
  numero?:              number;

  @IsString({ message: 'Bairro é obrigatório.' })
  @IsNotEmpty({ message: 'Bairro não pode ser vazio.' })
  bairro?:              string;

  @IsString({ message: 'Cidade é obrigatória.' })
  @IsNotEmpty({ message: 'Cidade não pode ser vazia.' })
  cidade?:              string;

  @IsString({ message: 'Estado é obrigatório.' })
  @IsNotEmpty({ message: 'Estado não pode ser vazio.' })
  estado?:              string;

  @IsString({ message: 'CEP é obrigatório.' })
  @IsNotEmpty({ message: 'CEP não pode ser vazio.' })
  cep?:                 string;

  @IsOptional()
  observacao?:         string;
}
