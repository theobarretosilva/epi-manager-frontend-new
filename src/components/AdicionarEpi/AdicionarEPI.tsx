import React, { useEffect } from "react";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import * as S from "./AdicionarEpi.styles";
import { InputStyled } from "../InputStyled/InputStyled";
import { EPIProps } from "../../props/episProps";
import { useGetEPIS } from "../../hooks/useGetEPIS";
import { AddEpiProps } from "../../props/addEpiProps";
import { useCadastroNewEPIForm } from "../../hooks/useCadastroNewEPIForm";
import { SubmitHandler } from "react-hook-form";

const AdicionarEpi: React.FC<AddEpiProps> = ({ setModalIsOpen, modalIsOpen, idEpi, setIdEpi }) => {
  const { epis } = useGetEPIS();
  const { 
    defaultValues,
    errors,
    handleSubmit,
    onSubmit,
    register,
    reset,
    responseError,
    setValue,
  } = useCadastroNewEPIForm({setIdEpi, setModalIsOpen, modalIsOpen});

  useEffect(() => {
    if (!modalIsOpen || !epis) return;

    const epi = epis?.find((epi: EPIProps) => epi.id === idEpi);
    
    if (idEpi && epi) {
      setValue("descricao", epi.descricao ?? "");
      setValue("codigo", epi.codigo);
      setValue("ca", epi.ca ?? "");
      setValue("dataValidade", epi.dataValidade.toISOString().split("T")[0]);
    } else {
      reset(defaultValues);
    }
  }, [defaultValues, epis, idEpi, modalIsOpen, reset, setValue]);

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit as SubmitHandler<unknown>)}>
      <S.DivWrapper>
        <InputStyled
          {...register("descricao")}
          tipo="text"
          titulo="Descrição do Item"
          name="descricao"
        />
        <p style={{color: 'red', margin: '0'}}>{errors.descricao?.message}</p>
        <InputStyled
          {...register("ca")}
          tipo="text"
          titulo="Certificado de Aprovação"
          name="ca"
        />
        <p style={{color: 'red', margin: '0'}}>{errors.ca?.message}</p>
        <InputStyled
          {...register("dataValidade")}
          tipo="date"
          titulo="Data de Validade"
          name="dataValidade"
        />
        <p style={{color: 'red', margin: '0'}}>{errors.dataValidade?.message}</p>
        <InputStyled
          {...register("preco")}
          tipo="number"
          titulo="Preço"
          name="preco"
        />
        <p style={{color: 'red', margin: '0'}}>{errors.preco?.message}</p>
        <InputStyled
          {...register("qtd")}
          tipo="number"
          titulo="Quantidade"
          name="qtd"
        />
        <p style={{color: 'red', margin: '0'}}>{errors.qtd?.message}</p>
        {idEpi !== null && idEpi !== undefined && (
          <InputStyled
            {...register("codigo")}
            tipo="number"
            titulo="Código"
            name="codigo"
            disabled={true}
          />
        )}
        {!!responseError && <p style={{margin: 0}}>{responseError}</p>}
      </S.DivWrapper>
      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarEpi;
