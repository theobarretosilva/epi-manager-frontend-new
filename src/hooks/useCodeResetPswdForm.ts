import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { CodeResetPswdForm, CRPswdValidationSchema } from "../types/codeResetPswd";
import { useState } from "react";

export const useCodeResetPswdForm = () => {
    const defaultValues = { n1: 0, n2: 0, n3: 0, n4: 0 };
    const [responseError, setResponseError] = useState("");
    const [resetCode, setResetCode] = useState<number | undefined>();
    const [checkedCode, setCheckedCode] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CodeResetPswdForm>({
        resolver: yupResolver(CRPswdValidationSchema),
        defaultValues,
    });

    const handleCodeReset: SubmitHandler<CodeResetPswdForm> = (data) => {
        const codigo = "" + data.n1 + data.n2 + data.n3 + data.n4;
        if ("" + resetCode == codigo) {
            setCheckedCode(true);
        } else {
            setResponseError("O código está incorreto!");
        }
    };

    const onSubmit = handleSubmit(handleCodeReset);

    return {
        onSubmit,
        errors,
        responseError,
        setResetCode,
        checkedCode,
        register,
    };
}