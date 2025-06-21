import { useMemo, useState } from "react"
import { TipoPermissao } from "../enums/TipoPermissao"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";
import { EditColabProps } from "../props/editColabProps";
import { schemas } from "../lib/yup/schemas";
import { EditColaboradorForm } from "../types/editColaboradorForm";

type ResponseError = {
    message: string;
};

export const useEditColabForm = ({ setIdColab, setModalIsOpen, idColab }: EditColabProps) => {
    const defaultValues = useMemo<EditColaboradorForm>(() => ({
        cargo: '',
        setor: '',
        lideranca: false,
        nome_lideranca: "Sem liderança",
        permissao: TipoPermissao.COLABORADOR
    }), []);

    const [responseError, setResponseError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<EditColaboradorForm>({
        resolver: yupResolver(schemas.editColaboradorForm),
        defaultValues,
    });

    const editColabMutation = useMutation({
        mutationFn: (data: EditColaboradorForm) => {
            setResponseError('');
            const updateColaboradorPromise = axiosInstance.patch(`/colaboradores/${idColab}`, data);
            toast.promise(updateColaboradorPromise, {
                pending: 'Atualizando...',
                success: 'Colaborador atualizado!',
                error: 'Erro ao atualizar colaborador.',
            });
            return updateColaboradorPromise;
        },
        onError: (error: AxiosError<ResponseError>) => {
            setResponseError(error.response?.data.message + '');
        },
        onSuccess: () => {
            reset();
            setModalIsOpen(false);
            setIdColab?.(null);
        }
    });

    const onSubmit: SubmitHandler<EditColaboradorForm> = (data) => {
        editColabMutation.mutate(data);
    };

    return {
        onSubmit: handleSubmit(onSubmit),
        register,
        responseError,
        reset,
        setValue,
        watch,
        defaultValues,
        errors
    };
}