import * as yup from 'yup'
import { TipoPermissao } from '../../enums/TipoPermissao'

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
    .required(errorMessages.required)
}