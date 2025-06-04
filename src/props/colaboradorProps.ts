import { SolicitacaoProps } from "./solicitacao.props";

export interface ColaboradorProps {
  matricula: string;
  nome: string;
  cpf: string;
  cargo: string;
  setor: string;
  lideranca: boolean;
  dataCadastro: Date;
  nome_lideranca: string;
  permissao: string;
  senha: string;
  email: string;
  solicitacoes: SolicitacaoProps[];
}