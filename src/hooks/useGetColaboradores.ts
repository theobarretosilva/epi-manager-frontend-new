import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { ColaboradorProps } from "../props/colaboradorProps";

export const useGetColaboradores = () => {

  const query = useQuery<ColaboradorProps[], Error>({
    queryKey: ['colaboradores'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/colaboradores/find-all');
      return data;
    },
  });

  return {
    colaboradores: query.data,
    isError: query.isError,
    refetch: query.refetch
  };
};
