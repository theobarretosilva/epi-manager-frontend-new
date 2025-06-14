import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemas } from '../lib/yup/schemas';
import { SolicitarEpiForm } from '../types/solicitarEpiForm';
import { Urgencia } from '../enums/Urgencia';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

type ResponseError = {
    message: string;
};

export const useHandleFormSolicitarEPI = () => {
    const navigate = useNavigate();
    const [responseError, setResponseError] = useState('');

    const defaultValues = useMemo<SolicitarEpiForm>(() => ({
        equipamentoId: 0,
        qtd: 0,
        urgencia: Urgencia.MEDIA,
        responsavel: '',
        matricula_responsavel: '',
    }), []);


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        setError,
    } = useForm<SolicitarEpiForm>({
        resolver: yupResolver(schemas.solicitarEpiForm),
        defaultValues,
    });

    const createSolicitacaoEpi = useMutation({
        mutationFn: (data: SolicitarEpiForm) => {
            setResponseError('');
            const createSolicitacaoPromise = axiosInstance.post('/solicitacoes/create', data);
            toast.promise(createSolicitacaoPromise, {
                pending: 'Processando...',
                success: 'Solicitação feita!',
                error: 'Houve um erro, tente novamente mais tarde.',
            });
            return createSolicitacaoPromise;
        },
        onSuccess: () => {
            reset();
            navigate('/solicitarEpi'); // tem que adaptar para colocar a rota de acordo com o perfil logado
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data?.error?.message
                ? error.response.data.error.message
                : 'Houve um erro, tente novamente mais tarde.';
            setResponseError(errorMessage);
            toast.error(errorMessage);
        },
    });

    const handleCreateSolicitacao: SubmitHandler<SolicitarEpiForm> = (data) => {
        createSolicitacaoEpi.mutate(data);
    };

    return {
        handleSubmit,
        onSubmit: handleCreateSolicitacao,
        register,
        responseError,
        reset,
        setValue,
        watch,
        defaultValues
    };
};