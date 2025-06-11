import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { schemas } from "../lib/yup/schemas";
import { ColaboradorForm } from "../types/colaboradorForm";
import { TipoPermissao } from "../enums/TipoPermissao";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useCadastroNewColabForm = () => {
    const defaultValues = useMemo<ColaboradorForm>(() => ({
        matricula: "",
        nome: "",
        cpf: "",
        cargo: "",
        setor: "",
        lideranca: false,
        dataCadastro: new Date(),
        nome_lideranca: "",
        permissao: TipoPermissao.COLABORADOR,
        senha: "",
        email: "",
    }), []);

    const [responseError, setResponseError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        setError,
    } = useForm<ColaboradorForm>({
        resolver: yupResolver(schemas.colaboradorForm),
        defaultValues,
    });

    type ResponseError = {
        message: string;
    };

    const createColabMutation = useMutation({
        mutationFn: (data: ColaboradorForm) => {
            setResponseError('');
            const createColaboradorPromise = axiosInstance.post('/colaboradores/create', data);
            toast.promise(createColaboradorPromise, {
                pending: 'Processando...',
                success: 'Colaborador criado!',
                error: 'Houve um erro, tente novamente mais tarde.',
            });
            return createColaboradorPromise;
        },
        onError: (error: AxiosError<ResponseError>) => {
            const errorMessage = error.response?.data.message;
            const isRepeatedCnpj = errorMessage?.toLocaleLowerCase().includes('cpf');
            const isRepeatedEmail = errorMessage?.toLocaleLowerCase().includes('email');

            if (isRepeatedCnpj) {
                setError('cpf', { message: 'Já existe um registro com esse CPF' })
                return
            };

            if (isRepeatedEmail) {
                setError('email', { message: 'Já existe um registro com esse email' })
                return
            };

            setResponseError('Houve um erro, tente novamente mais tarde.');
        },
    });
    
    const handleCreateForm: SubmitHandler<ColaboradorForm> = (data) => {
        createColabMutation.mutate(data);
    };

    const onSubmit = handleSubmit(handleCreateForm);

    return {
        onSubmit,
        register,
        responseError,
        reset,
        setValue,
        watch,
        defaultValues
    };
}