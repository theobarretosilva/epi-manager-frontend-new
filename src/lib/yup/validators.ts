import * as yup from 'yup'

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
}