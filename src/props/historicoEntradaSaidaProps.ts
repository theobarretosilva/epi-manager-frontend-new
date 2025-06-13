import { EPIProps } from "./episProps";

export interface HistoricoEntradaSaidaProps {
    id: number;
    entrada: number;
    saida: number;
    estoqueFinal: number;
    dataAtualizacao: Date;
    epi: EPIProps;
}