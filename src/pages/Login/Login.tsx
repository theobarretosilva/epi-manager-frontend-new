import { BtnStyled } from '../../components/BtnStyled/BtnStyled';
import { InputStyled } from '../../components/InputStyled/InputStyled';
import * as S from './Login.styles';
import asideImage from '../../assets/img/aside_login.jpg';
import logoImage from '../../assets/img/logo.png';
import { toast } from 'react-toastify';
import { useLoginForm } from '../../hooks/useLoginForm';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';

export const Login = () => {
    const { isLoading, onSubmit, errors, register, responseError } = 
        useLoginForm();
    const navigate = useNavigate();

    const LoginButtonLabel = isLoading ? (
        <CircularProgress size="1.5rem" color="inherit" />
    ) : (
        <BtnStyled text='Entrar' type='submit' />
    );

    const onSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const cargo = await handleLogin(matricula, senha);
            switch (cargo) {
                case 'Administrador':
                    toast.success("Logado com sucesso! Redirecionando...", { autoClose: 2000 });
                    setTimeout( () => navigate('/administrador/solicitacoes'), 2500);
                    break;
                case 'Colaborador':
                    toast.success("Logado com sucesso! Redirecionando...", { autoClose: 2000 });
                    setTimeout( () => navigate('/colaborador/solicitacoes'), 2500);
                    break;
                case 'Almoxarifado':
                    toast.success("Logado com sucesso! Redirecionando...", { autoClose: 2000 });
                    setTimeout( () => navigate('/almoxarifado/dashboardAlmox'), 2500);
                    break;
                default:
                    toast.error("Cargo não reconhecido.");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast.error(err.message);
            } else {
                setError("Ocorreu um erro inesperado.");
                toast.error("Ocorreu um erro inesperado.");
            }
        }
    }

    return (
        <S.DivGeral>
            <S.ImgAside src={asideImage} />
            <S.LinhaDivisao>‎</S.LinhaDivisao>
            <S.MainStyled>
                <S.ImgLogo src={logoImage} />
                <S.BoxForm>
                    <S.TituloBox>Bem-vindo(a) de volta!</S.TituloBox>
                    <S.SubtituloBox>Insira seus dados nos campos abaixo para logar como {tipoUser?.toLowerCase()}:</S.SubtituloBox>
                    <br />
                    <form onSubmit={onSubmit}>
                        <InputStyled
                            titulo='Matrícula'
                            tipo='text'
                            placeholder=''
                            {...register('matricula')}
                        />
                        <InputStyled
                            titulo='Senha'
                            tipo='password'
                            placeholder=''
                            {...register('password')}
                        />
                        <S.PEsqueciSenha onClick={() => navigate('/esqueciSenha')}>
                            Esqueci a senha
                        </S.PEsqueciSenha>
                        {responseError && <p>{responseError}</p>}
                        {LoginButtonLabel}
                    </form>
                    <S.PVoltar onClick={() => navigate("/")}>Voltar para seleção de usuário</S.PVoltar>
                </S.BoxForm>
            </S.MainStyled>
        </S.DivGeral>
    );
};