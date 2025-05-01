import * as S from './ModuloIndicNume.styles'

export const ModuloIndicNume = () => {
    return(
        <S.BoxStyled>
            <S.CardInfo>
                <S.TituloBox>Total de colaboradores cadastrados</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>20</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colaboradores com EPIs vencendo</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>20</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colabs cadastrados no mês</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>20</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colabs com EPIs vencendo nos próximos 30 dias</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>20</S.NInfo>
            </S.CardInfo>
        </S.BoxStyled>
    )
}