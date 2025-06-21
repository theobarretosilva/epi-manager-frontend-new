import { TipoPermissao } from "../enums/TipoPermissao";

export type EditColaboradorForm = {
  cargo: string;
  setor: string;
  lideranca: boolean;
  nome_lideranca: string;
  permissao: TipoPermissao;
};