import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"
import { queryClientInstance } from "../lib/tanstack-query"

export const useDeleteEPI = () => {
    const deleteEPIMutation = useMutation({
        mutationFn: (id: number | null) => {
            const deletePromise = axiosInstance.patch(`/equipamentos/${id}/status`);
            toast.promise(deletePromise, {
                pending: 'Deletando...',
                success: 'EPI excluído!',
                error: 'Não foi possivel excluir, tente novamente mais tarde!',
            })
            return deletePromise;
        },
        onSuccess: () => {
            queryClientInstance.invalidateQueries({
                queryKey: ['equipamentos'],
            })
        },
    });

    return { deleteEPIMutation };
};