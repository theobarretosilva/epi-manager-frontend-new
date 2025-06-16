import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify";
import { queryClientInstance } from "../lib/tanstack-query";

export const useDeliverEPI = () => {
    const deliverEPIMutation = useMutation({
        mutationFn: async (idSolicitacao: number) => {
            console.log(idSolicitacao)
            const deliverPromise = axiosInstance.put('/solicitacoes/delivery', { id: idSolicitacao });
            toast.promise(deliverPromise, {
                pending: 'Entregando...',
                success: 'EPI entregue!',
                error: 'Não foi possivel entregar, tente novamente mais tarde!',
            });
            return deliverPromise;
        },
        onSuccess: () => {
            queryClientInstance.invalidateQueries({
                queryKey: ['equipamentos/all'],
            })
        },
    });

    return { deliverEPIMutation };
}