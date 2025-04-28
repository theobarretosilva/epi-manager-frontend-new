import * as S from './BtnStyled.styles';

interface BtnStyledProps {
    text?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export const BtnStyled: React.FC<BtnStyledProps> = ({ text, type = "button", onClick, disabled = false, children }) => {
    return (
        <S.ButtonStyled disabled={disabled} onClick={onClick} type={type}>
            {text || children}
        </S.ButtonStyled>
    );
};
