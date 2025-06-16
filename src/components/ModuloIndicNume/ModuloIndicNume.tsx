import { useGetColaboradores } from '../../hooks/useGetColaboradores';
import { useGetColabsCadastradosMes } from '../../hooks/useGetColabsCadastradosMes';
import { useGetColabsComEPIsVencendo } from '../../hooks/useGetColabsEPIsVencendo';
import { useGetColabsEPIsVencendo30Dias } from '../../hooks/useGetColabsEPIsVencendo30Dias';
import { useGetSolicitacoes } from '../../hooks/useGetSolicitacoes';
import * as S from './ModuloIndicNume.styles'

export const ModuloIndicNume = () => {
    const { colaboradores } = useGetColaboradores();
    const { solicitacoes } = useGetSolicitacoes();
    const colabsComEPIsVencendo = useGetColabsComEPIsVencendo(solicitacoes);
    const colabsVencendo = useGetColabsEPIsVencendo30Dias(solicitacoes);
    
    return(
        <S.BoxStyled>
            <S.CardInfo>
                <S.TituloBox>Total de colaboradores cadastrados</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>{colaboradores?.length}</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colaboradores com EPIs vencendo</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>{colabsComEPIsVencendo}</S.NInfo>
            </S.CardInfo>
            <S.CardInfo>
                <S.TituloBox>Colabs com EPIs vencendo nos próximos 30 dias</S.TituloBox>
                <S.LinhaStyled></S.LinhaStyled>
                <S.NInfo>{colabsVencendo}</S.NInfo>
            </S.CardInfo>
        </S.BoxStyled>
    )
}