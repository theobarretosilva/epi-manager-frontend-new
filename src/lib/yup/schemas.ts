import * as yup from 'yup'
import { validators } from './validators'

export const schemas = {
    loginForm: yup.object().shape({
        matricula: validators.matricula_login,
        password: validators.senha,
    }),
    colaboradorForm: yup.object().shape({
        matricula: validators.matricula,
        nome: validators.nome,
        cpf: validators.cpf,
        cargo: validators.cargo,
        setor: validators.setor,
        lideranca: validators.lideranca,
        nome_lideranca: validators.nome_lideranca,
        permissao: validators.permissao,
        senha: validators.senha,
        email: validators.email
    }),
    editColaboradorForm: yup.object().shape({
        cargo: validators.cargo,
        setor: validators.setor,
        lideranca: validators.lideranca,
        nome_lideranca: validators.nome_lideranca,
        permissao: validators.permissao,
    }),
    solicitarEpiForm: yup.object().shape({
        equipamentoId: validators.equipamentoId,
        qtd: validators.qtd,
        urgencia: validators.urgencia,
        responsavel: validators.responsavel,
        matricula_responsavel: validators.matricula_responsavel,
        descricaoItem: validators.descricaoItem,
        solicitante: validators.solicitante,
        responsavelEPI: validators.responsavelEpi
    }),
    epiForm: yup.object().shape({
        descricao: validators.descricaoItem,
        ca: validators.ca,
        data_validade: validators.data_validade,
        preco: validators.preco,
        qtd: validators.qtd,
        foto: validators.foto,
        id: yup.number().optional().nullable(),
        codigo: yup.number().optional().nullable()
    }),
    editEpiForm: yup.object().shape({
        descricao: validators.descricaoItem,
        preco: validators.preco,
        codigo: yup.number().optional().nullable()
    })
}