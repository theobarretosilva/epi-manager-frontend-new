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
import { useGetUserLogado } from './useGetUserLogado';

export const useHandleFormSolicitarEPI = () => {
    const { userLogado } = useGetUserLogado();
    const navigate = useNavigate();
    const [responseError, setResponseError] = useState('');
    const tipoAcesso = sessionStorage.getItem('TipoAcesso')?.toLowerCase() || 'colaborador';
    const redirectPaths: Record<string, string> = {
        admin: '/administrador/solicitacoes',
        colaborador: '/colaborador/solicitacoes',
        almoxarifado: '/almoxarifado/dashboardAlmox',
    };
    const path = redirectPaths[tipoAcesso] || '/login';

    const defaultValues = useMemo<SolicitarEpiForm>(() => ({
        equipamentoId: 0,
        qtd: 0,
        urgencia: Urgencia.MEDIA,
        responsavel: '',
        matricula_responsavel: '',
        descricaoItem: '',
        solicitante: '',
        responsavelEPI: '',
    }), []);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SolicitarEpiForm>({

        resolver: yupResolver(schemas.solicitarEpiForm),
        defaultValues,
    });

    const createSolicitacaoEpi = useMutation({
        mutationFn: (data: SolicitarEpiForm) => {
            setResponseError('');
            const dataParaEnviar = {
                ...data,
                solicitanteId: userLogado?.id,
            };
            console.log(dataParaEnviar)
            const createSolicitacaoPromise = axiosInstance.post('/solicitacoes/create', dataParaEnviar);
            toast.promise(createSolicitacaoPromise, {
                pending: 'Processando...',
                success: 'Solicitação feita!',
                error: 'Houve um erro, tente novamente mais tarde.',
            });
            return createSolicitacaoPromise;
        },
        onSuccess: () => {
            reset({
                solicitante: userLogado?.nome || '',
                descricaoItem: '',
                equipamentoId: 0,
                urgencia: Urgencia.MEDIA,
                qtd: 1
            });
            navigate(path);
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
        defaultValues,
        errors
    };
};