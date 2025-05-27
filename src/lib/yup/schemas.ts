import * as yup from 'yup'
import { validators } from './validators'

export const schemas = {
    loginForm: yup.object().shape({
        matricula: validators.matricula,
        password: validators.password,
    }),
    colaboradorForm: yup.object().shape({
        matricula: validators.matricula,
        nome: validators.nome,
        cargo: validators.cargo,
        setor: validators.setor,
        dataCadastro: validators.dataCadastro,
        lideranca: validators.lideranca,
        matricula_lideranca: validators.matricula_lideranca,
        permissao: validators.permissao,
        cpf: validators.cpf
    })
}