import { useNavigate } from 'react-router'
import { BtnStyled } from '../../components/BtnStyled/BtnStyled'
import { InputStyled } from '../../components/InputStyled/InputStyled'
import * as S from './EsqueciSenha.styles'
import { useResetPswdMatrForm } from '../../hooks/useResetPswdMatrForm'
import { CircularProgress } from '@mui/material'
import { Controller } from 'react-hook-form'
import { CodigoResetPswdForm } from '../../components/CodigoResetPswdForm/CodigoResetPswdForm'

export const EsqueciSenha = () => {
    const {
        isLoading,
        onSubmit,
        errors,
        responseError,
        control,
        checkedEmail,
        matricula,
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
                <CodigoResetPswdForm codigo={codigo} matricula={matricula} />
            ) : (
                <>
                    <S.BoxForm>
                        <form onSubmit={onSubmit}>
                        <S.TituloBox>Esqueceu sua senha?</S.TituloBox>
                            <S.SubtituloBox>Não se preocupe, nós lhe enviaremos as instruções para recuperar sua senha!</S.SubtituloBox>
                            <S.SpaceDivider/>
                            <Controller
                                render={({ field }) => (
                                    <InputStyled
                                        {...field}
                                        titulo='Insira sua matrícula'
                                        tipo='text' placeholder=''
                                    />
                                )}
                                name='matricula'
                                control={control}
                            />
                            <S.SpaceDivider/>
                            <BtnStyled disabled={isLoading} text='Recuperar senha'/>
                        </form>
                    </S.BoxForm>
                    <S.PVoltar onClick={() => navigate('/login')}>Voltar</S.PVoltar>
                </>
            )}
        </S.DivWrapper>
    )
}