import * as S from './SelectStyled.styles';

interface SelectStyledProps {
    titulo: string;
    value?: string;
    disabled?: boolean;
    options: Array<string>;
    onChange?: (value) => void;
    name: string;
}

export const SelectStyled = ({ titulo, value, disabled, options, onChange, name }: SelectStyledProps) => {
    return (
        <S.DivGeral>
            <S.NameInput>{titulo}</S.NameInput>
            <S.SelectStyled 
                value={value} 
                disabled={disabled} 
                onChange={(e) => onChange?.(e.target.value)}
                name={name}
            >
                <option value="" disabled>Selecione uma opção</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </S.SelectStyled>
        </S.DivGeral>
    );
};
