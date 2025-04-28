import { useNavigate } from "react-router";
import { useSetNewPswdForm } from "../../hooks/useSetNewPswdForm";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import * as S from './SetNewPswdForm.styles'
import { Controller } from "react-hook-form";
import { InputStyled } from "../InputStyled/InputStyled";
import { ErrorMessage } from "../../pages/Login/Login.styles";
import PasswordStrengthBar from "react-password-strength-bar";
import { BtnStyled } from "../BtnStyled/BtnStyled";

type SetNewPswdFormProps = {
    email: string;
};

export const SetNewPswdForm = ({ email }: SetNewPswdFormProps) => {
    const { onSubmit, errors, responseError, control, isLoading, clearErrors } =
        useSetNewPswdForm(email);

    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const ResetPswdButtonLabel = isLoading ? (
        <CircularProgress size="1.5rem" color="inherit" />
    ) : (
        "Atualizar senha"
    );
    
    return(
        <>
            <S.BoxForm>
                <form onSubmit={onSubmit}>
                    <S.TituloBox>Defina sua senha nova</S.TituloBox>
                    <S.SpaceDivider />
                    <Controller
                        render={({ field: { onChange, ...rest } }) => (
                            <InputStyled
                                {...rest}
                                error={errors?.password ? true : false}
                                placeholder="Password"
                                tipo="password"
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    setPassword(e.target.value);
                                    clearErrors();
                                }}
                            />
                        )}
                        name="password"
                        control={control}
                    />
                    {errors?.password?.message && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                    <PasswordStrengthBar password={password} />
                    <Controller
                        render={({ field }) => (
                            <InputStyled
                                {...field}
                                error={errors?.confirm_password ? true : false}
                                placeholder="Confirm password"
                                tipo="password"
                            />
                        )}
                        name="confirm_password"
                        control={control}
                    />
                    <S.SpaceDivider />
                    {errors?.confirm_password?.message && (
                        <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
                    )}
                    <BtnStyled disabled={isLoading}>{ResetPswdButtonLabel}</BtnStyled>
                    {responseError && <ErrorMessage>{responseError}</ErrorMessage>}
                </form>
            </S.BoxForm>
            <S.PVoltar onClick={() => navigate('/login')}>Voltar</S.PVoltar>
        </>
    )
}