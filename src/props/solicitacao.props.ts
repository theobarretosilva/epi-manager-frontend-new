import { StatusSolicitacao } from "../enums/StatusSolicitacao";
import { Urgencia } from "../enums/Urgencia";
import { ColaboradorProps } from "./colaboradorProps";
import { EPIProps } from "./episProps";

export interface SolicitacaoProps {
    id: number;
    codigo: string;
    qtd: number;
    dataAbertura: Date;
    dataConclusao?: Date;
    entrega: boolean;
    status: StatusSolicitacao;
    urgencia: Urgencia;
    epi: EPIProps;
    solicitante: ColaboradorProps;
    responsavelEPI: ColaboradorProps;
};