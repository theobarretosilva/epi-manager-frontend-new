import { useNavigate } from 'react-router';
import { BtnStyled } from '../../components/BtnStyled/BtnStyled';
import { InputStyled } from '../../components/InputStyled/InputStyled';
import * as S from './EsqueciSenha.styles';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const EsqueciSenha = () => {
    const [codigoGerado, setCodigoGerado] = useState("");
    const [codigoDigitado, setCodigoDigitado] = useState("");
    const [etapa, setEtapa] = useState<"email" | "codigo" | "senha">("email");
    const [matricula, setMatricula] = useState("");
    const [email, setEmail] = useState("");
    const [senhaNova, setSenhaNova] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleEnviarEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.includes('@')) {
            toast.error("Digite um e-mail válido");
            return;
        }

        const codigo = String(Math.floor(100000 + Math.random() * 900000));
        setCodigoGerado(codigo);
        setIsLoading(true);

        const serviceId = 'service_evzqbrj';
        const templateId = 'template_vpwl0xj';
        const publicKey = 'R7xmXxa_lmNKUIlNW';

        const templateParams = {
            to_email: email,
            codigo_reset: codigo
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            toast.success('Código enviado com sucesso! Verifique seu e-mail.');
            setEtapa("codigo");
        } catch (error) {
            toast.error('Erro ao enviar o código. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerificarCodigo = () => {
        if (codigoDigitado === codigoGerado) {
            setEtapa("senha");
        } else {
            toast.error("Código incorreto. Verifique o e-mail e tente novamente.");
        }
    };

    const handleTrocarSenha = () => {
        if (senhaNova !== confirmarSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }
        toast.success("Senha alterada com sucesso!");
        navigate('/');
    };

    return (
        <S.DivWrapper>
            <S.ImgLogo src='../../src/assets/img/logo.png' />
            <S.SpaceDivider />

            {etapa === "email" && (
                <S.BoxForm>
                    <S.TituloBox>Esqueceu sua senha?</S.TituloBox>
                    <S.SubtituloBox>Insira seu e-mail e matrícula para receber o código de verificação</S.SubtituloBox>
                    <S.SpaceDivider />
                    <InputStyled
                        titulo="Insira sua matrícula"
                        tipo="text"
                        placeholder=""
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                    <InputStyled
                        titulo="Insira seu email"
                        tipo="text"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <S.SpaceDivider />
                    <BtnStyled onClick={handleEnviarEmail}>
                        {isLoading ? <CircularProgress size="1.5rem" color="inherit" /> : "Enviar código"}
                    </BtnStyled>
                    <S.PVoltar onClick={() => navigate('/')}>Voltar</S.PVoltar>
                </S.BoxForm>
            )}

            {etapa === "codigo" && (
                <S.BoxForm>
                    <S.TituloBox>Verifique seu e-mail</S.TituloBox>
                    <S.SubtituloBox>Digite o código que você recebeu</S.SubtituloBox>
                    <S.SpaceDivider />
                    <InputStyled
                        titulo="Código de verificação"
                        tipo="text"
                        placeholder="6 dígitos"
                        value={codigoDigitado}
                        onChange={(e) => setCodigoDigitado(e.target.value)}
                    />
                    <S.SpaceDivider />
                    <BtnStyled onClick={handleVerificarCodigo}>Verificar código</BtnStyled>
                    <S.PVoltar onClick={() => setEtapa("email")}>Voltar</S.PVoltar>
                </S.BoxForm>
            )}

            {etapa === "senha" && (
                <S.BoxForm>
                    <S.TituloBox>Nova senha</S.TituloBox>
                    <S.SubtituloBox>Digite a nova senha para sua conta</S.SubtituloBox>
                    <S.SpaceDivider />
                    <InputStyled
                        titulo="Nova senha"
                        tipo="password"
                        placeholder="********"
                        value={senhaNova}
                        onChange={(e) => setSenhaNova(e.target.value)}
                    />
                    <InputStyled
                        titulo="Confirmar nova senha"
                        tipo="password"
                        placeholder="********"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                    <S.SpaceDivider />
                    <BtnStyled onClick={handleTrocarSenha}>Trocar senha</BtnStyled>
                </S.BoxForm>
            )}
        </S.DivWrapper>
    );
};
