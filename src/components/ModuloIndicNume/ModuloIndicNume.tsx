import * as S from './ModuloIndicNume.styles'
import { IndicadoresProps } from './ModuloIndicNume.types'

export const ModuloIndicNume = ({ total, vencendo, cadastradosMes, vencendo30dias }: IndicadoresProps) => {
    return(
        <S.BoxStyled>
            <S.CardInfo>
                <S.TituloBox>Total de colaboradores cadastrados</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>{total}</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colaboradores com EPIs vencendo</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>{vencendo}</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colabs cadastrados no mês</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>{cadastradosMes}</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colabs com EPIs vencendo nos próximos 30 dias</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>{vencendo30dias}</S.NInfo>
            </S.CardInfo>
        </S.BoxStyled>
    )
}