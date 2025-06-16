import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCodeResetPswdForm } from "../../hooks/useCodeResetPswdForm";
import * as S from "./CodigoResetPswdForm.styles";
import { SetNewPswdForm } from "../SetNewPswdForm/SetNewPswdForm";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { ErrorMessage } from "../../pages/Login/Login.styles";

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
    }, [codigo, setResetCode]);

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
                                            {...register("n1", { required: "Este campo é obrigatório", pattern: /\d/ })}
                                            type="text"
                                            pattern="\d*"
                                            maxLength={1}
                                        />
                                        <S.InputCode
                                            {...register("n2", { required: "Este campo é obrigatório", pattern: /\d/ })}
                                            type="text"
                                            pattern="\d*"
                                            maxLength={1}
                                        />
                                        <S.InputCode
                                            {...register("n3", { required: "Este campo é obrigatório", pattern: /\d/ })}
                                            type="text"
                                            pattern="\d*"
                                            maxLength={1}
                                        />
                                        <S.InputCode
                                            {...register("n4", { required: "Este campo é obrigatório", pattern: /\d/ })}
                                            type="text"
                                            pattern="\d*"
                                            maxLength={1}
                                        />
                                        {errors?.n1?.message && (
                                            <ErrorMessage>{errors.n1.message}</ErrorMessage>
                                        )}
                                    </S.DivInputCode>
                                <BtnStyled text='Recuperar senha'/>
                                {responseError && <ErrorMessage>{responseError}</ErrorMessage>}
                            </S.FormInputCode>
                            <S.PResendEmail>
                                Não recebeu o e-mail?{" "}
                                <span
                                    style={{ fontWeight: "500", color: "black", cursor: "pointer" }}
                                    onClick={resendEmail}
                                >
                                    Clique aqui para reenviar
                                </span>
                            </S.PResendEmail>
                        </form>
                    </S.BoxForm>
                    <S.PVoltar onClick={() => navigate('/login')}>Voltar</S.PVoltar>
                </>
            )}
        </>
            
    )
}