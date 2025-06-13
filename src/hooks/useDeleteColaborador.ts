import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"
import { queryClientInstance } from "../lib/tanstack-query"

export const useDeleteColaborador = () => {
    const deleteColaboradorMutation = useMutation({
        mutationFn: (matricula: string) => {
            const deletePromise = axiosInstance.delete(`/colaboradores/${matricula}`)
            toast.promise(deletePromise, {
                pending: 'Deletando...',
                success: 'Colaborador excluído!',
                error: 'Não foi possivel excluir, tente novamente mais tarde!',
            })
            return deletePromise;
        },
        onSuccess: () => {
            queryClientInstance.invalidateQueries({
                queryKey: ['colaboradores/all'],
            })
        },
    });

    return { deleteColaboradorMutation };
}