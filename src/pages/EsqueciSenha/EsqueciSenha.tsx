import { useNavigate } from 'react-router'
import { BtnStyled } from '../../components/BtnStyled/BtnStyled'
import { InputStyled } from '../../components/InputStyled/InputStyled'
import * as S from './EsqueciSenha.styles'
import { useResetPswdMatrForm } from '../../hooks/useResetPswdMatrForm'
import { CircularProgress } from '@mui/material'
import { Controller } from 'react-hook-form'
import { CodigoResetPswdForm } from '../../components/CodigoResetPswdForm/CodigoResetPswdForm'
import { ErrorMessage } from '../Login/Login.styles'

export const EsqueciSenha = () => {
    const {
        isLoading,
        onSubmit,
        errors,
        responseError,
        control,
        checkedEmail,
        email,
        codigo,
    } = useResetPswdMatrForm();
    const navigate = useNavigate();

    const ContinueButtonLabel = isLoading ? (
        <CircularProgress size="1.5rem" color="inherit" />
      ) : (
        "Recuperar senha"
    );

    return (
        <S.DivWrapper>
            <S.ImgLogo src='../../src/assets/img/logo.png' />
            <S.SpaceDivider/>
            {checkedEmail === 200 ? (
                <CodigoResetPswdForm email={email} codigo={codigo} />
            ) : (
                <>
                    <S.BoxForm>
                        <form onSubmit={onSubmit}>
                        <S.TituloBox>Esqueceu sua senha?</S.TituloBox>
                            <S.SubtituloBox>Não se preocupe, nós lhe enviaremos as instruções para recuperar sua senha!</S.SubtituloBox>
                            <S.SpaceDivider/>
                            <Controller
                                name="matricula"
                                control={control}
                                render={({ field }) => (
                                    <InputStyled
                                        titulo="Insira sua matrícula"
                                        tipo="text"
                                        placeholder=""
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        inputRef={field.ref}
                                    />
                                )}
                            />
                            <S.SpaceDivider/>
                            {errors?.matricula?.message && (
                                <ErrorMessage>{errors.matricula.message}</ErrorMessage>
                            )}
                            <BtnStyled disabled={isLoading}>{ContinueButtonLabel}</BtnStyled>
                            {responseError && <ErrorMessage>{responseError}</ErrorMessage>}
                        </form>
                    </S.BoxForm>
                    <S.PVoltar onClick={() => navigate('/login')}>Voltar</S.PVoltar>
                </>
            )}
        </S.DivWrapper>
    )
}