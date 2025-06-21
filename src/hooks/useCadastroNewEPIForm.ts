import { useMemo, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../lib/yup/schemas";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AddEpiProps } from "../props/addEpiProps";
import { EpiForm } from "../types/epiForm";
import { ResponseError } from "../types/responseError";
import { queryClientInstance } from "../lib/tanstack-query";


export const useCadastroNewEPIForm = ({ setIdEpi, setModalIsOpen }: AddEpiProps) => {
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
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<EpiForm>({
        resolver: yupResolver(schemas.epiForm),
        defaultValues,
    });

    const createEpiMutation = useMutation({
        mutationFn: (data: EpiForm) => {
            setResponseError('');
            const createEpiPromise = axiosInstance.post('/equipamentos/create', data);
            return createEpiPromise;
        },
        onError: (error: AxiosError<ResponseError>) => {
            const errorMessage = error.response?.data.message;
            setResponseError(errorMessage + '');
            toast.error('Houve um erro, tente novamente mais tarde.')
        },
        onSuccess: () => {
            reset();
            setModalIsOpen(false);
            setIdEpi?.(null);
            toast.success('EPI criado!');
            queryClientInstance.invalidateQueries({
                queryKey: ['equipamentos'],
            })
        }
    });

    const handleFormSubmit: SubmitHandler<EpiForm> = (data) => {
        createEpiMutation.mutate(data);

    }

    return {
        onSubmit: handleFormSubmit,
        handleSubmit,
        register,
        responseError,
        reset,
        setValue,
        watch,
        defaultValues,
        errors
    };
}