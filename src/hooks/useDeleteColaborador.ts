import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-toastify"
import { queryClientInstance } from "../lib/tanstack-query"

export const useDeleteColaborador = () => {
    const deleteColaboradorMutation = useMutation({
        mutationFn: (id: number) => {
            const deletePromise = axiosInstance.patch(`/colaboradores/${id}/status`);
            toast.promise(deletePromise, {
                pending: 'Deletando...',
                success: 'Colaborador excluído!',
                error: 'Não foi possivel excluir, tente novamente mais tarde!',
            });
            return deletePromise;
        },
        onSuccess: () => {
            queryClientInstance.invalidateQueries({
                queryKey: ['colaboradores/all'],
            });
        },
    });

    return { deleteColaboradorMutation };
}