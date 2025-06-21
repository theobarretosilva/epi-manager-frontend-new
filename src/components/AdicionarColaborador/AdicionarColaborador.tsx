import React, { useEffect } from "react";
import * as S from "./AdicionarColaborador.styles";
import "react-toastify/dist/ReactToastify.css";
import { InputStyled } from "../InputStyled/InputStyled";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { TipoPermissao } from "../../enums/TipoPermissao";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useCadastroNewColabForm } from "../../hooks/useCadastroNewColabForm";
import { SelectStyled } from "../SelectStyled/SelectStyled";
import { useGetColaboradores } from "../../hooks/useGetColaboradores";
import { AddColaboradorProps } from "../../props/addColaboradorProps";

const AdicionarColaboradorModal: React.FC<AddColaboradorProps> = ({ setModalIsOpen, modalIsOpen }) => {
  const { colaboradores } = useGetColaboradores();
  const { handleSubmit, onSubmit, register, responseError, setValue, watch, defaultValues, errors, reset } =
    useCadastroNewColabForm({ setModalIsOpen });

  useEffect(() => {
    if (modalIsOpen) {
      reset(defaultValues);
    }
  }, [modalIsOpen, reset, defaultValues]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (values.lideranca && values.nome_lideranca !== "Sem liderança") {
        setValue("nome_lideranca", "Sem liderança");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const lideresList = colaboradores
    ?.filter((c) => c.lideranca && c.status_uso === "ATIVO")
    .map((c) => c.nome) ?? [];

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.DivWrapper>
        <InputStyled tipo="text" titulo="Nome completo" {...register("nome")} />
        <p style={{ color: "red", marginTop: '0' }}>{errors.nome?.message}</p>

        <S.DivInputs>
          <InputStyled tipo="text" titulo="Matrícula" {...register("matricula")} />
          <p style={{ color: "red", marginTop: '0' }}>{errors.matricula?.message}</p>

          <InputStyled 
            tipo="text" 
            titulo="CPF" 
            {...register("cpf", {
              onChange: (e) => {
                let value = e.target.value.replace(/\D/g, "");
                value = value.replace(/(\d{3})(\d)/, "$1.$2");
                value = value.replace(/(\d{3})(\d)/, "$1.$2");
                value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                e.target.value = value;
              },
            })}
          />
          <p style={{ color: "red", marginTop: '0' }}>{errors.cpf?.message}</p>
        </S.DivInputs>

        <S.DivInputs>
          <InputStyled tipo="text" titulo="Setor" {...register("setor")} />
          <p style={{ color: "red", marginTop: '0' }}>{errors.setor?.message}</p>

          <InputStyled tipo="text" titulo="Cargo" {...register("cargo")} />
          <p style={{ color: "red", marginTop: '0' }}>{errors.cargo?.message}</p>
        </S.DivInputs>

        <S.DivInputs style={{ gap: "0" }}>
          <FormControl style={{ marginTop: "1vh" }}>
            <FormLabel>Cargo de liderança?</FormLabel>
            <RadioGroup
              row
              style={{ width: "14vw" }}
              value={watch("lideranca") ? "true" : "false"}
              onChange={(e) => setValue("lideranca", e.target.value === "true")}
            >
              <FormControlLabel value="true" control={<Radio />} label="Sim" />
              <FormControlLabel value="false" control={<Radio />} label="Não" />
            </RadioGroup>
            <p style={{ color: "red", marginTop: '0' }}>{errors.lideranca?.message}</p>
          </FormControl>

          <FormControl style={{ marginTop: "1vh" }}>
            <FormLabel>Tipo de permissão</FormLabel>
            <RadioGroup
              row
              style={{ width: "28vw" }}
              value={watch("permissao")}
              onChange={(e) => setValue("permissao", e.target.value as TipoPermissao)}
            >
              <FormControlLabel value={TipoPermissao.COLABORADOR} control={<Radio />} label="Colaborador" />
              <FormControlLabel value={TipoPermissao.ALMOXARIFADO} control={<Radio />} label="Almoxarifado" />
              <FormControlLabel value={TipoPermissao.ADMIN} control={<Radio />} label="Administrador" />
            </RadioGroup>
            <p style={{ color: "red", marginTop: '0' }}>{errors.permissao?.message}</p>
          </FormControl>
        </S.DivInputs>

        <SelectStyled
          disabled={watch("lideranca")}
          titulo="Nome liderança"
          value={watch("nome_lideranca")}
          options={lideresList}
          onChange={(value) => setValue("nome_lideranca", value ?? "Sem liderança")}
          name="nome_lideranca"
        />
        <p style={{ color: "red", marginTop: '0' }}>{errors.nome_lideranca?.message}</p>

        <S.DivInputs>
          <InputStyled tipo="email" titulo="Email" {...register("email")} />
          <p style={{ color: "red", marginTop: '0' }}>{errors.email?.message}</p>

          <InputStyled tipo="password" titulo="Senha" {...register("senha")} />
          <p style={{ color: "red", marginTop: '0' }}>{errors.senha?.message}</p>
        </S.DivInputs>

        {!!responseError && <p>{responseError}</p>}
      </S.DivWrapper>

      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarColaboradorModal;
