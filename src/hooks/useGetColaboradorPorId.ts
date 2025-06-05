import { useQuery } from "@tanstack/react-query"
import { ColaboradorForm } from "../types/colaboradorForm"
import { axiosInstance } from "../lib/axios"

export const useGetColaboradorPorId = (id: string) => {
    const query = useQuery<ColaboradorForm, Error>({
        queryKey: ['colaborador'],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/colaboradores/${id}`);
            return data;
        },
    });

    return {
        colaborador: query.data,
        isError: query.isError,
    };
};