import { EstoqueProps } from "./estoqueProps";
import { HistoricoEntradaSaidaProps } from "./HistoricoEntradaSaidaProps";
import { SolicitacaoProps } from "./solicitacao.props";

export interface EPIProps {
    id: number;
    codigo: number;
    descricao: string;
    preco: number;
    dataValidade: Date;
    ca: string;
    estoques: EstoqueProps[];
    historico: HistoricoEntradaSaidaProps[];
    solicitacoes: SolicitacaoProps[];
    linkFoto: string;
}