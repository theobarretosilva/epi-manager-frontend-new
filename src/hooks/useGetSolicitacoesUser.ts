import { useQuery } from "@tanstack/react-query";
import { SolicitacaoProps } from "../props/solicitacao.props";
import { axiosInstance } from "../lib/axios";

export const useGetSolicitacoesUser = () => {
    const query = useQuery<SolicitacaoProps[], Error>({
        queryKey: ['solicitacoes'],
        queryFn: async () => {
            const token = sessionStorage.getItem('EpiManagerToken');
            if (token) {
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            const { data } = await axiosInstance.get('/solicitacoes/my-request');
            return data;
        },
    });

    return {
        solicitacoesUser: query.data,
        isError: query.isError,
    };
}