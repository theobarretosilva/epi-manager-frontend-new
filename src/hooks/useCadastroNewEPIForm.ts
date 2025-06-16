import { useMemo, useState } from "react"
import { EpiForm } from "../types/epiForm"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../lib/yup/schemas";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AddEpiProps } from "../props/addEpiProps";
import { EditEpiForm } from "../types/editEpiForm";

export const useCadastroNewEPIForm = ({ setIdEpi, setModalIsOpen, idEpi }: AddEpiProps) => {
    const defaultValues = useMemo<EpiForm>(() => ({
        descricao: '',
        ca: '',
        data_validade: '',
        preco: 0,
        qtd: 0,
        codigo: undefined,
        foto: ''
    }), []);

    const [responseError, setResponseError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<EpiForm>({
        resolver: yupResolver(schemas.epiForm),
        defaultValues,
    });

    type ResponseError = {
        message: string;
    };

    const createEpiMutation = useMutation({
        mutationFn: (data: EpiForm) => {
            setResponseError('');
            const createEpiPromise = axiosInstance.post('/equipamentos/create', data);
            toast.promise(createEpiPromise, {
                pending: 'Processando...',
                success: 'EPI criado!',
                error: 'Houve um erro, tente novamente mais tarde.',
            });
            return createEpiPromise;
        },
        onError: (error: AxiosError<ResponseError>) => {
            const errorMessage = error.response?.data.message;

            setResponseError(errorMessage + '');
        },
        onSuccess: () => {
            reset();
            setModalIsOpen(false);
            setIdEpi?.(null);
        }
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
        }
    })

    const handleFormSubmit: SubmitHandler<EpiForm> = (data: EpiForm) => {
        createEpiMutation.mutate(data);

    }

    const handleEditFormSubmit: SubmitHandler<EpiForm> = (data) => {
        const editData: EditEpiForm = {
            codigo: data.codigo,
            descricao: data.descricao,
            preco: data.preco
        };
        editEpiMutation.mutate(editData);
    };

    return {
        handleSubmit,
        onSubmit: handleFormSubmit,
        onSubmitEdit: handleEditFormSubmit,
        register,
        responseError,
        reset,
        setValue,
        watch,
        defaultValues,
        errors
    };
}