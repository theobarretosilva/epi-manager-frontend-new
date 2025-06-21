import { Urgencia } from "../enums/Urgencia";
import { ColaboradorProps } from "./colaboradorProps";

export interface SolicitacaoModalProps {
  item: string | undefined;
  id: number | undefined;
  status: string | undefined;
  dataSolicitacao: Date | string;
  solicitante: ColaboradorProps | undefined;
  quantidade: number | undefined;
  codigoEPI: number | undefined;
  urgencia: Urgencia | undefined;
  dataConclusao: string | Date | undefined;
}