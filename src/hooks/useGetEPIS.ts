import { useQuery } from "@tanstack/react-query"
import { EPIProps } from "../props/episProps"
import { axiosInstance } from "../lib/axios"

export const useGetEPIS = () => {
    const query = useQuery<EPIProps[], Error>({
        queryKey: ['epis'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/equipamentos');
            return data;
        },
    });

    return {
        epis: query.data,
        isError: query.isError,
    };
}