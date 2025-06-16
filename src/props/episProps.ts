import { SolicitacaoProps } from "./solicitacao.props";

export interface EPIProps {
    id?: number;
    codigo?: number;
    descricao: string | undefined;
    preco: number;
    qtd: number;
    ca: string;
    data_validade: Date;
    solicitacoes: SolicitacaoProps[];
    status_uso: string;
    foto: string;
}