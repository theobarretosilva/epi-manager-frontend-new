import { useQuery } from "@tanstack/react-query"
import { ColaboradorForm } from "../types/colaboradorForm"
import { axiosInstance } from "../lib/axios"
import { useLogOutIfExpiredToken } from "./useLogOutIfExpiredToken";

export const useGetColaboradorPorId = (id: string) => {
    const { handleLogOutIfExpiredToken } = useLogOutIfExpiredToken();

    const query = useQuery<ColaboradorForm, Error>({
        queryKey: ['colaborador'],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/colaboradores/${id}`);
            return data;
        },
        onError: handleLogOutIfExpiredToken,
    });

    return {
        colaborador: query.data,
        isError: query.isError,
    };
};