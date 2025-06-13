import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { LoginForm } from '../types/loginForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemas } from '../lib/yup/schemas';
import { axiosInstance } from '../lib/axios';
import { useMutation } from '@tanstack/react-query';
import { HandleLoginSuccessProps } from '../types/loginResponse';
import { AxiosError } from 'axios';

export const useLoginForm = () => {
    const defaultValues = { matricula: '', password: '' };
    const navigate = useNavigate();
    const [responseError, setResponseError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(schemas.loginForm),
        defaultValues,
    });

    const redirectPaths: Record<string, string> = {
        admin: '/administrador/solicitacoes',
        colaborador: '/colaborador/solicitacoes',
        almoxarifado: '/almoxarifado/dashboardAlmox',
    };

    const handleLoginSuccess = ({ access_token, permissao }: HandleLoginSuccessProps) => {
        localStorage.setItem('EpiManagerToken', access_token);
        localStorage.setItem("TipoAcesso", permissao);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        toast.success("Logado com sucesso! Redirecionando...", { autoClose: 2000 });

        const path = redirectPaths[permissao.toLowerCase()];
        if (path) {
            setTimeout(() => navigate(path), 2500);
        } else {
            toast.error("Cargo não reconhecido.");
        }
    };

    const loginMutation = useMutation({
        mutationFn: async (data: LoginForm) => {
            console.log(data);
            setResponseError("");
            const { data: responseData } = await axiosInstance.post<HandleLoginSuccessProps>(
                '/auth/login',
                data,
            );
            return responseData;
        },
        onSuccess: handleLoginSuccess,
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.error.message
                ? error.response?.data.error.message
                : 'Houve um erro, tente novamente mais tarde.';
            setResponseError(errorMessage);
            toast.error(errorMessage);
        },
    });

    const handleSignIn: SubmitHandler<LoginForm> = (data) => {
        loginMutation.mutate(data)
    }

    const onSubmit = handleSubmit(handleSignIn)

    return {
        isLoading: loginMutation.isPending,
        onSubmit,
        errors,
        register,
        responseError,
    }
};
