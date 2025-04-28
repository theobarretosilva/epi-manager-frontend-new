import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { SetNewPswdForm, SNPswdValidationSchema } from "../types/setNewPswdForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useSetNewPswdForm = (email: string) => {
    const defaultValues = { password: "", confirm_password: "" };
    const [responseError, setResponseError] = useState("");
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<SetNewPswdForm>({
        resolver: yupResolver(SNPswdValidationSchema),
        defaultValues,
    });

    const setNewPswdMutation = useMutation({
        mutationFn: async (data: SetNewPswdForm) => {
            const { password, confirm_password } = data;
            const sendData = {
                password,
                confirm_password,
                email,
            };
            setResponseError("");
            const { data: responseData } = await axiosInstance.patch(
                "/changePassword",
                sendData,
            );
            return responseData;
        },
        onSuccess: () => {
            toast.success("Senha recuperada com sucesso!");
            setTimeout(() => navigate("/login"), 3 * 1000);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.message
              ? error.response.data.message
              : "Algo não deu certo, tente novamente mais tarde!";
            setResponseError(errorMessage);
        },
    });

    const handleSetNewPswd: SubmitHandler<SetNewPswdForm> = (data) => {
        setNewPswdMutation.mutate(data);
    };
    
    const onSubmit = handleSubmit(handleSetNewPswd);
    
    return {
        onSubmit,
        errors,
        responseError,
        control,
        isLoading: setNewPswdMutation.isPending,
        clearErrors
    };
}