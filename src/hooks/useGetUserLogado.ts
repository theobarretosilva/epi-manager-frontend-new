import { useQuery } from "@tanstack/react-query"
import { ColaboradorProps } from "../props/colaboradorProps"
import { axiosInstance } from "../lib/axios"

export const useGetUserLogado = () => {
    const query = useQuery<ColaboradorProps, Error>({
        queryKey: ['colaborador'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/colaboradores/find-me');
            return data;
        },
    });

    return {
        userLogado: query.data,
        isError: query.isError,
    };
}