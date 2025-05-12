import { useState } from 'react';
import { BtnStyled } from '../../components/BtnStyled/BtnStyled';
import { InputStyled } from '../../components/InputStyled/InputStyled';
import * as S from './Login.styles';
import { useNavigate } from 'react-router';
import asideImage from '../../assets/img/aside_login.jpg';
import logoImage from '../../assets/img/logo.png';
import { toast } from 'react-toastify';

export const Login = () => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const colaboradores = JSON.parse(sessionStorage.getItem("ColaboradoresCadastrados") || "[]");
    const tipoUser = sessionStorage.getItem("TipoAcesso");

    const calculateHash = async (password: string, salt: string) => {
        const encoder = new TextEncoder();
        const passwordBytes = encoder.encode(password);
        const saltBytes = new Uint8Array(
            salt.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
        );
        const combined = new Uint8Array([...passwordBytes, ...saltBytes]);
        const hashBuffer = await crypto.subtle.digest("SHA-256", combined);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    };

    const handleLogin = async (matricula: string, senha: string) => {
        const user = colaboradores.find((u: { matricula: string }) => u.matricula === matricula);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        const hash = await calculateHash(senha, user.salt);
        if (hash === user.hash) {
            sessionStorage.setItem("TipoAcesso", user.cargo);
            sessionStorage.setItem("UserLogado", JSON.stringify(user));
            return user.cargo;
        } else {
            throw new Error("Senha incorreta.");
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
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
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
                        />
                        <InputStyled
                            titulo='Senha'
                            tipo='password'
                            placeholder=''
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <S.PEsqueciSenha onClick={() => navigate('/esqueciSenha')}>
                            Esqueci a senha
                        </S.PEsqueciSenha>
                        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                        <BtnStyled text='Entrar' type='submit' />
                    </form>
                    <S.PVoltar onClick={() => navigate("/")}>Voltar para seleção de usuário</S.PVoltar>
                </S.BoxForm>
            </S.MainStyled>
        </S.DivGeral>
    );
};