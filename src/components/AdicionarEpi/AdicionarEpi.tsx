import React from "react";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import * as S from './AdicionarEpi.styles.ts'
import { InputStyled } from "../InputStyled/InputStyled";
import { AddEpiProps } from "../../props/addEpiProps";
import { useCadastroNewEPIForm } from "../../hooks/useCadastroNewEPIForm";

const AdicionarEpi: React.FC<AddEpiProps> = ({ setModalIsOpen, modalIsOpen, idEpi, setIdEpi }) => {
  const { 
    errors,
    onSubmit,
    register,
    responseError,
    handleSubmit
  } = useCadastroNewEPIForm({setIdEpi, setModalIsOpen, modalIsOpen, idEpi});

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.DivWrapper>
        <InputStyled
          {...register("descricao")}
          tipo="text"
          titulo="Descrição do Item"
          name="descricao"
        />
        <p style={{ color: 'red', margin: '0' }}>{errors.descricao?.message}</p>

        <InputStyled
          {...register("preco")}
          tipo="number"
          titulo="Preço"
          name="preco"
        />
        <p style={{ color: 'red', margin: '0' }}>{errors.preco?.message}</p>

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
              tipo="date"
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
        {!!responseError && <p style={{ margin: 0 }}>{responseError}</p>}
      </S.DivWrapper>

      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarEpi;
