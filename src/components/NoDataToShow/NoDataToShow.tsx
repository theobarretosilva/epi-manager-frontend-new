import * as S from './NoDataToShow.styles'

interface NoDataToShowProps {
    mainText: string;
}

export const NoDataToShow = ({ mainText }: NoDataToShowProps) => {
    return(
        <S.DivStyled>
            <S.PNoData>{mainText}</S.PNoData>
            <S.ImgNoData src='../../src/assets/svg/add_information.svg' />
        </S.DivStyled>
    )
}