export type EpiForm = {
    descricao: string;
    ca: string;
    data_validade: string;
    preco: number;
    qtd: number;
    foto: string;
    id?: number | null | undefined; // Tornando opcional
    codigo?: number | null | undefined; // Tornando opcional
};