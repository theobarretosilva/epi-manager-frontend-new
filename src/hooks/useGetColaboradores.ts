import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useLogOutIfExpiredToken } from "./useLogOutIfExpiredToken";
import { ColaboradorProps } from "../props/colaboradorProps";

export const useGetColaboradores = () => {
  const { handleLogOutIfExpiredToken } = useLogOutIfExpiredToken();

  const query = useQuery<ColaboradorProps[], Error>({
    queryKey: ['colaboradores'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/colaboradores/find-all');
      return data;
    },
    onError: handleLogOutIfExpiredToken,
  });

  return {
    colaboradores: query.data,
    isError: query.isError,
  };
};
