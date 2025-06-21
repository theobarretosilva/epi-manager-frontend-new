import { TipoPermissao } from "../enums/TipoPermissao";

export type ColaboradorForm = {
    matricula: string;
    nome: string;
    cpf: string;
    cargo: string;
    setor: string;
    lideranca: boolean;
    nome_lideranca: string;
    permissao: TipoPermissao;
    senha: string;
    email: string;
}