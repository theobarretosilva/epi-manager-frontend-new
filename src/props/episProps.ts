import { EstoqueProps } from "./estoqueProps";
import { HistoricoEntradaSaidaProps } from "./historicoEntradaSaidaProps";
import { SolicitacaoProps } from "./solicitacao.props";

export interface EPIProps {
    id: number;
    codigo: number;
    descricao: string | undefined;
    preco: number;
    data_validade: Date;
    ca: string;
    estoques: EstoqueProps[];
    historico: HistoricoEntradaSaidaProps[];
    solicitacoes: SolicitacaoProps[];
    linkFoto: string;
}