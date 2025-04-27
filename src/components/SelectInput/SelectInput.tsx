import * as S from "./SelectInput.styles"
import { SelectInputProps } from "./SelectInput.styles"

export const SelectInput: React.FC<SelectInputProps> = ({text , title, disable, handle}) => {

    return (
        <S.DivGeral>
            <S.NameInput>{title}</S.NameInput>
            <S.InputStyled value={text} onChange={handle} disabled={disable}>
                <option value={"Baixa"}>Baixa</option>
                <option value={"Normal"}>Normal</option>
                <option value={"Alta"}>Alta</option>
            </S.InputStyled>
        </S.DivGeral>   
    )
}