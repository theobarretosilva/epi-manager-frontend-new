import * as yup from 'yup'
import { TipoPermissao } from '../../enums/TipoPermissao'
import { Urgencia } from '../../enums/Urgencia'

const errorMessages = {
  required: 'Campo obrigatório',
  email: 'E-mail inválido',
  passwordLength: 'A senha precisa ter, no mínimo, 8 caracteres',
}

export const validators = {
  email: yup
    .string()
    .required(errorMessages.required)
    .email(errorMessages.email),
  senha: yup
    .string()
    .min(8, errorMessages.passwordLength)
    .required(errorMessages.required),
  matricula: yup
    .string()
    .required(errorMessages.required),
  matricula_login: yup
    .string()
    .required(errorMessages.required),
  nome: yup
    .string()
    .required(errorMessages.required),
  cargo: yup
    .string()
    .required(errorMessages.required),
  setor: yup
    .string()
    .required(errorMessages.required),
  dataCadastro: yup
    .date().default(() => new Date()),
  lideranca: yup
    .boolean()
    .required(),
  matricula_lideranca: yup
    .number()
    .required(errorMessages.required),
  permissao: yup
    .mixed<TipoPermissao>()
    .oneOf(Object.values(TipoPermissao), 'Permissão inválida')
    .required(errorMessages.required),
  cpf: yup
    .string()
    .required(errorMessages.required)
    .matches(
      /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/,
      'CPF inválido'
    ),
  nome_lideranca: yup
    .string()
    .required(errorMessages.required),
  equipamentoId: yup
    .number()
    .required(errorMessages.required)
    .min(1, "Selecione um equipamento válido"),
  qtd: yup
    .number()
    .required(errorMessages.required)
    .min(1, "A quantidade precisa ser pelo menos 1"),
  urgencia: yup
    .string()
    .required(errorMessages.required)
    .oneOf(Object.values(Urgencia), 'Urgência inválida'),
  responsavel: yup
    .string()
    .required(errorMessages.required),
  descricaoItem: yup
    .string()
    .required(errorMessages.required),
  solicitante: yup
    .string()
    .required(errorMessages.required),
  id: yup
    .number()
    .optional(),
  ca: yup
    .string()
    .required(errorMessages.required),
  data_validade: yup
    .string()
    .required(errorMessages.required),
  preco: yup
    .number()
    .required(errorMessages.required),
  codigo: yup
    .number()
    .optional(),
  matricula_responsavel: yup
    .string()
    .required(errorMessages.required),
  foto: yup
    .string()
    .required(errorMessages.required),
  responsavelEpi: yup
    .string()
    .default('')
}