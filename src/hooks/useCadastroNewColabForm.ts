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
import { AddColaboradorProps } from "../props/addColaboradorProps";
import { ResponseError } from "../types/responseError";

export const useCadastroNewColabForm = ({ setIdColab, setModalIsOpen }: AddColaboradorProps) => {
    const defaultValues = useMemo<ColaboradorForm>(() => ({
        matricula: "",
        nome: "",
        cpf: "",
        cargo: "",
        setor: "",
        lideranca: false,
        nome_lideranca: "Sem liderança",
        permissao: TipoPermissao.COLABORADOR,
        senha: "",
        email: ""
    }), []);

    const [responseError, setResponseError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        setError,
        formState: { errors }
    } = useForm<ColaboradorForm>({
        resolver: yupResolver(schemas.colaboradorForm),
        defaultValues,
    });

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
            const isRepeatedCpf = errorMessage?.toLocaleLowerCase().includes('cpf');

            if (isRepeatedCpf) {
                setError('cpf', { message: 'Já existe um registro com esse CPF' })
                return
            };

            setResponseError('Houve um erro, tente novamente mais tarde.');
        },
        onSuccess: () => {
            reset();
            setModalIsOpen(false);
            setIdColab?.(null);
        }
    });
    
    const handleFormSubmit: SubmitHandler<ColaboradorForm> = (data: ColaboradorForm) => {
        createColabMutation.mutate(data);
    };
    
    return {
        handleSubmit,
        onSubmit: handleFormSubmit,
        register,
        responseError,
        reset,
        setValue,
        watch,
        defaultValues,
        errors
    };
}