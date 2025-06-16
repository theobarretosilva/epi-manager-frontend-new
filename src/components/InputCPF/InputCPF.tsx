import React from "react";
import InputMask from "react-input-mask";
import { InputStyled } from "../InputStyled/InputStyled";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputCPFProps {
  registerProps: UseFormRegisterReturn;
  titulo: string;
}

export const InputCPF: React.FC<InputCPFProps> = ({ registerProps, titulo }) => (
  <InputMask mask="999.999.999-99" {...registerProps}>
    {(inputProps) => <InputStyled {...inputProps} tipo="text" titulo={titulo} />}
  </InputMask>
);