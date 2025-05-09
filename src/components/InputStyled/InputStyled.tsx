import * as S from './InputStyled.styles';
import React from 'react';

interface InputStyledProps {
    titulo?: string;
    tipo: string;
    placeholder?: string;
    value?: string | number;
    name?: string;
    disabled?: boolean;
    hidden?: boolean;
    error?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    inputRef?: React.Ref<HTMLInputElement>;
}

export const InputStyled = ({
    titulo,
    tipo,
    placeholder,
    name,
    value,
    onChange,
    onBlur,
    inputRef,
    disabled,
    hidden,
    error,
}: InputStyledProps) => {
    const inputId = `input-${name || titulo?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <S.DivGeral>
            {titulo && (
                <label htmlFor={inputId}>
                    <S.NameInput>{titulo}</S.NameInput>
                </label>
            )}
            <S.InputStyled
                id={inputId}
                hidden={hidden}
                disabled={disabled}
                name={name}
                type={tipo}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={inputRef}
                error={error}
                aria-label={titulo}
            />
        </S.DivGeral>
    );
};
