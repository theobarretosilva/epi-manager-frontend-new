import * as S from "./InputDisable.styles"
import { InputDisableProps } from "./InputDisable.styles"

export const InputDisable: React.FC<InputDisableProps> = ({text , title, type, name}) => {
    return (
        <S.DivGeral>
            <S.NameInput>{title}</S.NameInput>
            <S.InputStyled name={name} value={text} disabled type={type} />
        </S.DivGeral>   
    )
}