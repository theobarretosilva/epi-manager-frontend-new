import { BtnStyled } from '../../components/BtnStyled/BtnStyled';
import { InputStyled } from '../../components/InputStyled/InputStyled';
import * as S from './Login.styles';
import asideImage from '../../assets/img/aside_login.jpg';
import logoImage from '../../assets/img/logo.png';
import { useLoginForm } from '../../hooks/useLoginForm';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

export const Login = () => {
    const { isLoading, onSubmit, errors, register, responseError } = 
        useLoginForm();

    const LoginButtonLabel = isLoading ? (
        <CircularProgress size="1.5rem" color="inherit" />
    ) : (
        <BtnStyled text='Entrar' type='submit' />
    );

    return (
        <S.DivGeral>
            <S.ImgAside src={asideImage} />
            <S.LinhaDivisao>‎</S.LinhaDivisao>
            <S.MainStyled>
                <S.ImgLogo src={logoImage} />
                <S.BoxForm>
                    <S.TituloBox>Bem-vindo(a) de volta!</S.TituloBox>
                    <S.SubtituloBox>Insira seus dados nos campos abaixo para fazer login!</S.SubtituloBox>
                    <br />
                    <form onSubmit={onSubmit}>
                        <InputStyled
                            titulo='Matrícula'
                            tipo='text'
                            placeholder=''
                            {...register('matricula')}
                        />
                        <p style={{color: 'red', margin: '0'}}>{errors.matricula?.message}</p>
                        <InputStyled
                            titulo='Senha'
                            tipo='password'
                            placeholder=''
                            {...register('password')}
                        />
                        <p style={{color: 'red', margin: '0'}}>{errors.password?.message}</p>
                        <S.PEsqueciSenha onClick={() => toast.info('Entre em contato com a administração para recuperar sua senha!')}>
                            Esqueci a senha
                        </S.PEsqueciSenha>
                        {responseError && <p style={{ color: 'red', marginTop: '5px' }}>{responseError}</p>}
                        {LoginButtonLabel}
                    </form>
                    {/* <S.PVoltar onClick={() => navigate("/")}>Voltar para seleção de usuário</S.PVoltar> */}
                </S.BoxForm>
            </S.MainStyled>
        </S.DivGeral>
    );
};