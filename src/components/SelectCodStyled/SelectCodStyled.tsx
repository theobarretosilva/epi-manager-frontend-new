import { OptionProps } from '../../props/optionProps';
import * as S from './SelectCodStyled.styles';

interface SelectCodStyledProps {
    titulo: string;
    value?: string;
    disabled?: boolean;
    options: Array<OptionProps>;
    onChange?: (selectedOption: OptionProps) => void;
}

export const SelectCodStyled = ({ titulo, value, disabled, options, onChange }: SelectCodStyledProps) => {
    return (
        <S.DivGeral>
            <S.NameInput>{titulo}</S.NameInput>
            <S.SelectStyled
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    const selectedValue = Number(e.target.value);
                    const selectedOption = options.find(option => option.value === selectedValue);
                    if (selectedOption) onChange?.(selectedOption);
                }}
            >
                <option value="" disabled>Selecione uma opção</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </S.SelectStyled>
        </S.DivGeral>
    );
};
