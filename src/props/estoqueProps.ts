import { EPIProps } from "./episProps";

export interface EstoqueProps {
    id: number;
    qtd: number;
    estoqueMinimo: number;
    epi: EPIProps;
}