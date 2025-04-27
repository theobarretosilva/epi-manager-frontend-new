import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCodeResetPswdForm } from "../../hooks/useCodeResetPswdForm";
import * as S from "./CodigoResetPswdForm.styles";
import { SetNewPswdForm } from "../SetNewPswdForm/SetNewPswdForm";

type CodigoResetPswdFormProps = {
    email: string;
    codigo?: number;
};

export const CodigoResetPswdForm = ({ email, codigo }: CodigoResetPswdFormProps) => {
    const {
        onSubmit,
        errors,
        responseError,
        setResetCode,
        checkedCode,
        register,
    } = useCodeResetPswdForm();
    const navigate = useNavigate();

    const resendEmail = () => {
        onSubmit();
    };

    useEffect(() => {
        setResetCode(codigo);
    }, []);

    return (
        <>
            {checkedCode ? (
                <SetNewPswdForm />
            ) : (
                <>
                    <S.BoxForm>
                        <form onSubmit={onSubmit}>
                        <S.TituloBox>Recuperação de senha</S.TituloBox>
                            <S.SubtituloBox>
                                Enviamos um código para{" "}
                                <S.SpanStyled>{email}</S.SpanStyled>
                                <br/>
                                Insira o código para dar continuidade
                            </S.SubtituloBox>
                            <S.FormInputCode onSubmit={onSubmit}>
                                <S.DivInputCode>
                                    <S.InputCode
                                        {...register("n1")}
                                        type="text"
                                        pattern="\d*"
                                        maxLength={1}
                                    />
                                    <S.InputCode
                                        {...register("n2")}
                                        type="text"
                                        pattern="\d*"
                                        maxLength={1}
                                    />
                                    <S.InputCode
                                        {...register("n3")}
                                        type="text"
                                        pattern="\d*"
                                        maxLength={1}
                                    />
                                    <S.InputCode
                                        {...register("n4")}
                                        type="text"
                                        pattern="\d*"
                                        maxLength={1}
                                    />
                                    {errors?.n1?.message && (
                                        <ErrorMessage>{errors.n1.message}</ErrorMessage>
                                    )}
                                </S.DivInputCode>
                            <BtnStyled disabled={isLoading} text='Recuperar senha'/>
                        </form>
                    </S.BoxForm>
                    <S.PVoltar onClick={() => navigate('/login')}>Voltar</S.PVoltar>
                </>
            )}
        </>
            
    )
}