import * as S from './BtnStyled.styles'

interface BtnStyledProps {
    text: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e) => void;
    disabled?: boolean;
}

export const BtnStyled: React.FC<BtnStyledProps> = ({ text, type, onClick }) => {
    return(
        <S.ButtonStyled disabled onClick={onClick} type={type}>{text}</S.ButtonStyled>
    )
}