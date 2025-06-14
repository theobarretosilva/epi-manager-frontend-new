import { SolicitacaoProps } from "./solicitacao.props";

export interface ColaboradorProps {
  id: number;
  matricula: string;
  nome: string;
  cpf: string;
  cargo: string;
  setor: string;
  lideranca: boolean;
  nome_lideranca?: string;
  permissao: string;
  senha: string;
  email: string;
  solicitacoes: SolicitacaoProps[];
}