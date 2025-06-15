import { SolicitacaoProps } from "./solicitacao.props";

export interface ColaboradorProps {
  id: number;
  matricula: number;
  nome: string;
  cpf: string;
  cargo: string;
  setor: string;
  lideranca: boolean;
  nome_lideranca?: string;
  permissao: string;
  senha: string;
  solicitacoes: SolicitacaoProps[];
  status_uso: string;
}