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
  password: yup
    .string()
    .required(errorMessages.required)
    .min(8, errorMessages.passwordLength),
  matricula: yup
    .number()
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
    .required(errorMessages.required),
  matricula_lideranca: yup
    .number()
    .required(errorMessages.required),
  permissao: yup
    .string()
    .required(errorMessages.required)
    .oneOf(Object.values(TipoPermissao), 'Permissão inválida'),
  cpf: yup
    .string()
    .required(errorMessages.required)
    .matches(
      /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/,
      'CPF inválido'
    ),
  nome_lideranca: yup
  .string()
  .when("lideranca", {
    is: false, // se não for liderança, o campo é obrigatório
    then: (schema) =>
      schema.required("Selecione um nome de liderança"),
    otherwise: (schema) => 
      schema.oneOf(["Sem liderança"]),
  }),
  equipamentoId: yup
    .number()
    .required(errorMessages.required),
  qtd: yup
    .number()
    .required(errorMessages.required),
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
  dataValidade: yup
    .string()
    .required(errorMessages.required),
  preco: yup
    .number()
    .required(errorMessages.required),
  codigo: yup
    .number()
    .optional()
}