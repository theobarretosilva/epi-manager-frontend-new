import { useQuery } from "@tanstack/react-query"
import { SolicitacaoProps } from "../props/solicitacao.props"
import { axiosInstance } from "../lib/axios"

export const useGetSolicitacoes = () => {
    const query = useQuery<SolicitacaoProps[], Error>({
        queryKey: ['solicitacoes'],
        queryFn: async () => {
            const token = sessionStorage.getItem('EpiManagerToken');
            if (token) {
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const { data } = await axiosInstance.get('/solicitacoes/all');
            return data;
        },
    });

    return {
        solicitacoes: query.data,
        isError: query.isError,
    };
};