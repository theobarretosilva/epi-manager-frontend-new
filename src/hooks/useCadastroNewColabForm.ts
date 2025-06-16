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
import { EditColaboradorForm } from "../types/editColaboradorForm";

export const useCadastroNewColabForm = ({ setIdColab, setModalIsOpen, idColab }: AddColaboradorProps) => {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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
            setIdColab(null);
        }
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
            setIdColab(null);
        }
    })
    
    const handleFormSubmit: SubmitHandler<ColaboradorForm> = (data: ColaboradorForm) => {
        const isEdit = !!data.id;
        if (isEdit) {
            editColabMutation.mutate(data);
        } else {
            createColabMutation.mutate(data);
        }
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