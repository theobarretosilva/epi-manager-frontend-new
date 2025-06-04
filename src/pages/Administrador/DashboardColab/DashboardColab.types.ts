export interface ColaboradorProps {
    id: string;
    nome: string; 
    matricula: string;
    setor: string;
    cargo: string;
    email: string;
    hash: string;
    salt: string;
    dataCadastro: string;
    epis: { nome: string; validade: string }[];
    cpf: string;
};

export interface SolicitacaoProps {
    id: string;
    descricaoItem: string;
    status: string;
    codigoEPI: string;
    prioridade: string;
    solicitante: string;
    dataSolicitacao?: string;
    setor?: string;
};

export interface RowData {
    id: string;
    matricula: string;
    nome: string;
    cargo: string;
    setor: string;
}