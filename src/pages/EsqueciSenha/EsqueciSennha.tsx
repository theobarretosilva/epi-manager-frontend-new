import { BtnStyled } from '../../components/BtnStyled/BtnStyled'
import { InputStyled } from '../../components/InputStyled/InputStyled'
import * as S from './EsqueciSenha.styles'

export const EsqueciSenha = () => {
    return (
        <S.DivWrapper>
            <S.ImgLogo src='../../src/assets/img/logo.png' />
            <S.SpaceDivider/>
            <S.BoxForm>
                <form>
                    <S.TituloBox>Esqueceu sua senha?</S.TituloBox>
                    <S.SubtituloBox>Insira sua matrícula para que um email seja enviado ao seu endereço cadastrado em nossa base</S.SubtituloBox>
                    <S.SpaceDivider/>
                    <InputStyled titulo='Matrícula' tipo='text' placeholder='' />
                    <S.SpaceDivider/>
                    <BtnStyled text='Enviar e-mail'/>
                </form>

            </S.BoxForm>


        </S.DivWrapper>
    )
}