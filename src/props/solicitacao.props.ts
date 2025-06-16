import { StatusSolicitacao } from "../enums/StatusSolicitacao";
import { Urgencia } from "../enums/Urgencia";
import { ColaboradorProps } from "./colaboradorProps";
import { EPIProps } from "./episProps";

export interface SolicitacaoProps {
    id: number;
    codigo: number;
    qtd: number;
    dataAbertura: Date;
    dataConclusao?: Date;
    entrega: boolean;
    status: StatusSolicitacao;
    urgencia: Urgencia;
    equipamento: EPIProps;
    solicitante: ColaboradorProps;
    responsavelEPI: ColaboradorProps;
};