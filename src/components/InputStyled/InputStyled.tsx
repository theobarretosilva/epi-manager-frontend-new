import * as S from './InputStyled.styles';
import React, { forwardRef } from 'react';

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
  maxLength?: number;
}

export const InputStyled = forwardRef<HTMLInputElement, InputStyledProps>(
  (
    {
      titulo,
      tipo,
      placeholder,
      name,
      value,
      onChange,
      onBlur,
      disabled,
      hidden,
      error,
      maxLength
    },
    ref
  ) => {
    return (
      <S.DivGeral>
        <S.NameInput>{titulo}</S.NameInput>
        <S.InputStyled
          hidden={hidden}
          disabled={disabled}
          name={name}
          type={tipo}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          error={error}
          maxLength={maxLength}
        />
      </S.DivGeral>
    );
  }
);

InputStyled.displayName = "InputStyled";
