import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FPMatriculaValidationSchema, FrgtPswdMatriculaForm } from "../types/frgtPswdMatrForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";

export const useResetPswdMatrForm = () => {
    const defaultValues = { matricula: "" };
    const [checkedEmail, setCheckedEmail] = useState();
    const [matricula, setMatricula] = useState("");
    const [responseError, setResponseError] = useState("");
    const [codigo, setCodigo] = useState();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FrgtPswdMatriculaForm>({
        resolver: yupResolver(FPMatriculaValidationSchema),
        defaultValues,
    });

    const frgtPswdMatriculaMutation = useMutation({
        mutationFn: async (data: FrgtPswdMatriculaForm) => {
            setResponseError("");
            const { data: responseData } = await axiosInstance.post(
                "/findEmailbyMatricula",
                { data },
            );
            setCheckedEmail(responseData.code);
            setCodigo(responseData.resetPasswordCode);
        },
        onSuccess: (_, { matricula: formMatricula }) => {
            setMatricula(formMatricula);
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const errorMessage = error.response?.data.message
                ? error.response.data.message
                : "Algo não deu certo, tente novamente mais tarde!";
            setResponseError(errorMessage);
        },
    });

    const handleFindMatricula: SubmitHandler<FrgtPswdMatriculaForm> = (data) => {
        frgtPswdMatriculaMutation.mutate(data);
    };

    const onSubmit = handleSubmit(handleFindMatricula);

    return{
        isLoading: frgtPswdMatriculaMutation.isPending,
        onSubmit,
        errors,
        responseError,
        control,
        checkedEmail,
        matricula,
        codigo,
    }
}