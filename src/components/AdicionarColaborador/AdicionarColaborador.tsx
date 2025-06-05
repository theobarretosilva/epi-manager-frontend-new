import React, { useEffect, useMemo } from "react";
import * as S from "./AdicionarColaborador.styles";
import "react-toastify/dist/ReactToastify.css";
import { InputStyled } from "../InputStyled/InputStyled";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../../lib/yup/schemas";
import { ColaboradorForm } from "../../types/colaboradorForm";
import { TipoPermissao } from "../../enums/TipoPermissao";
import { useGetColaboradores } from "../../hooks/useGetColaboradores";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { AddColaboradorProps } from "../../props/addColaboradorProps";

const AdicionarColaborador: React.FC<AddColaboradorProps> = ({
  setModalIsOpen,
  idColab,
  modalIsOpen,
  setIdColab,
}) => {
  const { colaboradores } = useGetColaboradores();

  const defaultValues = useMemo<ColaboradorForm>(() => ({
    matricula: "",
    nome: "",
    cpf: "",
    cargo: "",
    setor: "",
    lideranca: true,
    dataCadastro: new Date(),
    nome_lideranca: "",
    permissao: TipoPermissao.COLABORADOR,
    senha: "",
    email: "",
  }), []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ColaboradorForm>({
    resolver: yupResolver(schemas.colaboradorForm),
    defaultValues,
  });

  const onSubmit = () => {
    reset();
    setModalIsOpen(false);
    setIdColab(null);
  };

  useEffect(() => {
  if (!modalIsOpen || !colaboradores) return;

  const colaborador = colaboradores?.find(c => c.matricula === idColab);

  if (idColab && colaborador) {
    const colaboradorComPermissaoNormalizada = {
      ...colaborador,
      permissao: colaborador.permissao as TipoPermissao,
    };

    Object.entries(colaboradorComPermissaoNormalizada).forEach(([key, value]) => {
      if (key in defaultValues) {
        setValue(key as keyof ColaboradorForm, value as any);
      }
    });
  } else {
    reset(defaultValues);
  }
}, [idColab, modalIsOpen, colaboradores, defaultValues, setValue, reset]);
console.log("permissao atual:", watch("permissao"));
  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.DivWrapper>
        <InputStyled tipo="text" titulo="Nome completo" {...register("nome")} />
        <S.DivInputs>
          <InputStyled tipo="text" titulo="Matrícula" {...register("matricula")} />
          <InputStyled tipo="text" titulo="CPF" {...register("cpf")} />
        </S.DivInputs>
        <S.DivInputs>
          <InputStyled tipo="text" titulo="Setor" {...register("setor")} />
          <InputStyled tipo="text" titulo="Cargo" {...register("cargo")} />
        </S.DivInputs>
        <S.DivInputs style={{gap: '0'}}>
          <FormControl style={{marginTop: '1vh'}}>
            <FormLabel>Cargo de liderança?</FormLabel>
            <RadioGroup
              row
              style={{ width: '14vw'}}
              value={watch("lideranca") ? "true" : "false"}
              onChange={(e) => setValue("lideranca", e.target.value === "true")}
            >
              <FormControlLabel value="true" control={<Radio />} label="Sim" />
              <FormControlLabel value="false" control={<Radio />} label="Não" />
            </RadioGroup>
          </FormControl>
          <FormControl style={{ marginTop: "1vh" }}>
            <FormLabel>Tipo de permissão</FormLabel>
            <RadioGroup
              row
              style={{ width: "28vw"}}
              value={watch("permissao")}
              onChange={(e) =>
                setValue("permissao", e.target.value as TipoPermissao)
              }
            >
              <FormControlLabel
                value={TipoPermissao.COLABORADOR}
                control={<Radio />}
                label="Colaborador"
              />
              <FormControlLabel
                value={TipoPermissao.ALMOXARIFADO}
                control={<Radio />}
                label="Almoxarifado"
              />
              <FormControlLabel
                value={TipoPermissao.ADMINISTRADOR}
                control={<Radio />}
                label="Administrador"
              />
            </RadioGroup>
          </FormControl>
        </S.DivInputs>
        <InputStyled tipo="text" titulo="Nome liderança" {...register("nome_lideranca")} />
        <S.DivInputs>
          <InputStyled tipo="email" titulo="Email" {...register("email")} />
          {!idColab && (
            <InputStyled tipo="password" titulo="Senha" {...register("senha")} />
          )}
        </S.DivInputs>
      </S.DivWrapper>
      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarColaborador;
