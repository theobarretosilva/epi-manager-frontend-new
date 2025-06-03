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
        cpf: validators.cpf,
        cargo: validators.cargo,
        setor: validators.setor,
        lideranca: validators.lideranca,
        dataCadastro: validators.dataCadastro,
        matricula_lideranca: validators.matricula_lideranca,
        nome_lideranca: validators.nome_lideranca,
        permissao: validators.permissao,
        senha: validators.password
    })
}