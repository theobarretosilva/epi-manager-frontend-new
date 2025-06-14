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
        nome_lideranca: validators.nome_lideranca,
        permissao: validators.permissao,
        senha: validators.password,
        email: validators.email
    }),
    solicitarEpiForm: yup.object().shape({
        equipamentoId: validators.equipamentoId,
        qtd: validators.qtd,
        urgencia: validators.urgencia,
        responsavel: validators.responsavel,
        matricula_responsavel: validators.matricula,
    })
}