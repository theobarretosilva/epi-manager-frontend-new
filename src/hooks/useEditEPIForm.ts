import { useMemo, useState } from "react";
import { EditEpiForm } from "../types/editEpiForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../lib/yup/schemas";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { EditEpiProps } from "../props/editEpiProps";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ResponseError } from "../types/responseError";
import { queryClientInstance } from "../lib/tanstack-query";

export const useEditEPIForm = ({ setIdEpi, setModalIsOpen, idEpi }: EditEpiProps) => {
    const defaultValues = useMemo<EditEpiForm>(() => ({
        descricao: '',
        preco: 0,
    }), []);

    const [responseError, setResponseError] = useState('');
    
    const {
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<EditEpiForm>({
        resolver: yupResolver(schemas.editEpiForm),
        defaultValues,
    });

    const editEpiMutation = useMutation({
        mutationFn: (data: EditEpiForm) => {
            setResponseError('');
            const updateEpiPromise = axiosInstance.patch(`/equipamentos/${idEpi}`, data);
            toast.promise(updateEpiPromise, {
                pending: 'Atualizando...',
                success: 'EPI atualizado!',
                error: 'Erro ao atualizar o EPI.',
            });
            return updateEpiPromise;
        },
        onError: (error: AxiosError<ResponseError>) => {
            setResponseError(error.response?.data.message + '');
        },
        onSuccess: () => {
            reset();
            setModalIsOpen(false);
            setIdEpi?.(null);
            queryClientInstance.invalidateQueries({
                queryKey: ['equipamentos'],
            })
        }
    });

    const handleFormSubmit: SubmitHandler<EditEpiForm> = (data: EditEpiForm) => {
        editEpiMutation.mutate(data);
    };

    return {
        onSubmit: handleFormSubmit,
        register,
        responseError,
        reset,
        setValue,
        watch,
        defaultValues,
        errors,
        handleSubmit
    };
}