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
      if (epi.data_validade) {
        const data = new Date(epi.data_validade);
        if (!isNaN(data.getTime())) {
          setValue("data_validade", data.toISOString().split("T")[0]);
        }
      }
    } else {
      reset(defaultValues);
    }
  }, [defaultValues, epis, idEpi, modalIsOpen, reset, setValue]);

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit as SubmitHandler<unknown>)}>
      <S.DivWrapper>
        {/* Sempre mostra Descrição */}
        <InputStyled
          {...register("descricao")}
          tipo="text"
          titulo="Descrição do Item"
          name="descricao"
        />
        <p style={{ color: 'red', margin: '0' }}>{errors.descricao?.message}</p>

        {/* Sempre mostra Preço */}
        <InputStyled
          {...register("preco")}
          tipo="number"
          titulo="Preço"
          name="preco"
        />
        <p style={{ color: 'red', margin: '0' }}>{errors.preco?.message}</p>

        {/* Só mostra os outros campos se NÃO estiver editando */}
        {!idEpi && (
          <>
            <InputStyled
              {...register("ca")}
              tipo="text"
              titulo="Certificado de Aprovação"
              name="ca"
            />
            <p style={{ color: 'red', margin: '0' }}>{errors.ca?.message}</p>

            <InputStyled
              {...register("data_validade")}
              tipo="string"
              titulo="Data de Validade"
              name="data_validade"
            />
            <p style={{ color: 'red', margin: '0' }}>{errors.data_validade?.message}</p>

            <S.DivInputs>
              <InputStyled
                {...register("qtd")}
                tipo="number"
                titulo="Quantidade"
                name="qtd"
              />
              <p style={{ color: 'red', margin: '0' }}>{errors.qtd?.message}</p>
            </S.DivInputs>

            <InputStyled
              {...register("foto")}
              tipo="url"
              titulo="Link da foto do EPI"
              name="foto"
            />
            <p style={{ color: 'red', margin: '0' }}>{errors.foto?.message}</p>
          </>
        )}

        {/* Código aparece somente no modo edição, e desabilitado */}
        {idEpi !== null && idEpi !== undefined && (
          <InputStyled
            {...register("codigo")}
            tipo="number"
            titulo="Código"
            name="codigo"
            disabled={true}
          />
        )}

        {!!responseError && <p style={{ margin: 0 }}>{responseError}</p>}
      </S.DivWrapper>

      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarEpi;
