import React, { useEffect } from "react";
import * as S from "./AdicionarColaborador.styles";
import "react-toastify/dist/ReactToastify.css";
import { InputStyled } from "../InputStyled/InputStyled";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { ColaboradorForm } from "../../types/colaboradorForm";
import { TipoPermissao } from "../../enums/TipoPermissao";
import { useGetColaboradores } from "../../hooks/useGetColaboradores";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { AddColaboradorProps } from "../../props/addColaboradorProps";
import { useCadastroNewColabForm } from "../../hooks/useCadastroNewColabForm";
import { SelectStyled } from "../SelectStyled/SelectStyled";
import { SubmitHandler } from "react-hook-form";

const AdicionarColaborador: React.FC<AddColaboradorProps> = ({
  setModalIsOpen,
  idColab,
  modalIsOpen,
  setIdColab,
}) => {
  const { colaboradores } = useGetColaboradores();
  const {
    handleSubmit,
    onSubmit,
    register,
    responseError,
    reset,
    setValue,
    watch,
    defaultValues,
    errors
  } = useCadastroNewColabForm({setIdColab, setModalIsOpen});

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
          setValue(
            key as keyof ColaboradorForm,
            value as ColaboradorForm[keyof ColaboradorForm]
          );
        }
      });
    } else {
      reset(defaultValues);
    }
  }, [idColab, modalIsOpen, colaboradores, setValue, reset, defaultValues]);

  const lideres = colaboradores?.filter((c) => c.lideranca) ?? [];
  const lideresList: string[] = lideres.map((c) => c.nome);

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit as SubmitHandler<ColaboradorForm>)}>
      <S.DivWrapper>
        <InputStyled tipo="text" titulo="Nome completo" {...register("nome")} />
        <p style={{color: 'red', margin: '0'}}>{errors.nome?.message}</p>
        <S.DivInputs>
          <InputStyled tipo="text" titulo="Matrícula" {...register("matricula")} />
          <p style={{color: 'red', margin: '0'}}>{errors.matricula?.message}</p>
          <InputStyled
            tipo="text"
            titulo="CPF"
            maxLength={14}
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
          <p style={{color: 'red', margin: '0'}}>{errors.cpf?.message}</p>
        </S.DivInputs>
        <S.DivInputs>
          <div>
            <InputStyled tipo="text" titulo="Setor" {...register("setor")} />
            <p style={{color: 'red', margin: '0'}}>{errors.setor?.message}</p>
          </div>
          <div>
            <InputStyled tipo="text" titulo="Cargo" {...register("cargo")} />
            <p style={{color: 'red', margin: '0'}}>{errors.cargo?.message}</p>
          </div>
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
            <p style={{color: 'red', margin: '0'}}>{errors.lideranca?.message}</p>
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
                value={TipoPermissao.ADMIN}
                control={<Radio />}
                label="Administrador"
              />
            </RadioGroup>
            <p style={{color: 'red', margin: '0'}}>{errors.permissao?.message}</p>
          </FormControl>
        </S.DivInputs>
        <SelectStyled
          disabled={watch("lideranca") ? true : false}
          titulo="Nome liderança" 
          value={watch("nome_lideranca") ?? 'Sem liderança'} 
          options={lideresList} 
          onChange={(e) =>
            setValue("nome_lideranca", e.target.value  ?? 'Sem liderança')
          } 
          name='nome_lideranca'
        />
        <p style={{color: 'red', margin: '0'}}>{errors.nome_lideranca?.message}</p>
        <S.DivInputs>
          <div>
            <InputStyled tipo="email" titulo="Email" {...register("email")} />
            <p style={{color: 'red', margin: '0'}}>{errors.email?.message}</p>
          </div>
          <div>
            {!idColab && (
              <InputStyled tipo="password" titulo="Senha" {...register("senha")} />
            )}
            <p style={{color: 'red', margin: '0'}}>{errors.senha?.message}</p>
          </div>
        </S.DivInputs>
        {!!responseError && <p>{responseError}</p>}
      </S.DivWrapper>
      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarColaborador;
