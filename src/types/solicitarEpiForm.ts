import { Urgencia } from "../enums/Urgencia";

export type SolicitarEpiForm = {
    equipamentoId: number;
    qtd: number;
    urgencia: Urgencia;
    responsavel: string;
    matricula_responsavel: string;
    descricaoItem: string;
    solicitante: string;
}