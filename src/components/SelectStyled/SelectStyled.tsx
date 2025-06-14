import * as S from './SelectStyled.styles';
import { SelectStyledProps } from './SelectStyled.types';

export const SelectStyled = ({ titulo, value, disabled, options, onChange, name }: SelectStyledProps) => {
    return (
        <S.DivGeral>
            <S.NameInput>{titulo}</S.NameInput>
            <S.SelectStyled 
                value={value} 
                disabled={disabled} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value || 'Sem liderança')}
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
