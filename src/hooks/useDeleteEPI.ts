import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"
import { queryClientInstance } from "../lib/tanstack-query"

export const useDeleteEPI = () => {
    const deleteEPIMutation = useMutation({
        mutationFn: (id: number) => {
            const deletePromise = axiosInstance.delete(`/equipamentos/${id}`)
            toast.promise(deletePromise, {
                pending: 'Deletando...',
                success: 'EPI excluído!',
                error: 'Não foi possivel excluir, tente novamente mais tarde!',
            })
            return deletePromise;
        },
        onSuccess: () => {
            queryClientInstance.invalidateQueries({
                queryKey: ['equipamentos/all'],
            })
        },
    });

    return { deleteEPIMutation };
};