import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify";
import { queryClientInstance } from "../lib/tanstack-query";

export const useDeliverEPI = () => {
    const deliverEPIMutation = useMutation({
        mutationFn: async (idSolicitacao: number) => {
            const deliverPromise = axiosInstance.put('/solicitacoes/delivery', { id: idSolicitacao });
            return deliverPromise;
        },
        onSuccess: () => {
            queryClientInstance.invalidateQueries({
                queryKey: ['solicitacoes'],
            })
            toast.success('EPI entregue')
        },
        onError: () => {
            toast.error('Não foi possivel entregar, tente novamente mais tarde!')
        }
    });

    return { deliverEPIMutation };
}