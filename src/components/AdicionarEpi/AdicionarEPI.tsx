import React, { useState, useEffect } from "react";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import * as S from "./AdicionarEpi.styles";
import { toast } from "react-toastify";
import { InputStyled } from "../InputStyled/InputStyled";

const AdicionarEpi: React.FC<S.AddEPIProps> = ({ setModalIsOpen, onAdd, modalIsOpen, idEpi }) => {
  const epis = JSON.parse(sessionStorage.getItem("EPIsCadastrados") || "[]");
  const [descricaoItem, setDescricaoItem] = useState("");
  const [codigo, setCodigo] = useState("");
  const [certificadoAprovacao, setCertificadoAprovacao] = useState("");
  const [validade, setValidade] = useState("");

  useEffect(() => {
    if (modalIsOpen && idEpi) {
      const epi = epis.find((epi: any) => epi.id === idEpi);
      if (epi) {
        setDescricaoItem(epi.descricaoItem);
        setCodigo(epi.codigo);
        setCertificadoAprovacao(epi.certificadoAprovacao);
        setValidade(epi.validade);
      }
    } else {
      setDescricaoItem("");
      setCodigo("");
      setCertificadoAprovacao("");
      setValidade("");
    }
  }, [idEpi, modalIsOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "descricaoItem":
        setDescricaoItem(value);
        break;
      case "codigo":
        setCodigo(value);
        break;
      case "certificadoAprovacao":
        setCertificadoAprovacao(value);
        break;
      case "validade":
        setValidade(value);
        break;
      default:
        break;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricaoItem || !codigo || !certificadoAprovacao || !validade) {
      toast.warning("Por favor, preencha todos os campos.", {
        autoClose: 6000,
        closeOnClick: true,
      });
    } else {
      try {
        const epi = {
          id: codigo,
          descricaoItem,
          codigo,
          certificadoAprovacao,
          validade,
        };

        if (idEpi) {
          const index = epis.findIndex((e: any) => e.id === idEpi);
          if (index !== -1) epis[index] = epi;
        } else {
          epis.push(epi);
        }

        sessionStorage.setItem("EPIsCadastrados", JSON.stringify(epis));
        onAdd(epi);
        toast.success(idEpi ? "EPI atualizado com sucesso!" : "EPI adicionado com sucesso!", {
          autoClose: 6000,
          closeOnClick: true,
        });
        setModalIsOpen(false);
      } catch (error) {
        toast.error("Ocorreu um erro ao salvar o EPI");
      }
    }
  };

  return (
    <S.FormContainer onSubmit={handleSave}>
      <S.DivWrapper>
        <InputStyled
          value={descricaoItem}
          tipo="text"
          titulo="Descrição do Item"
          name="descricaoItem"
          handle={handleChange}
        />
        <InputStyled
          value={codigo}
          tipo="text"
          titulo="Código"
          name="codigo"
          handle={handleChange}
        />
        <InputStyled
          value={certificadoAprovacao}
          tipo="text"
          titulo="Certificado de Aprovação"
          name="certificadoAprovacao"
          handle={handleChange}
        />
        <InputStyled
          value={validade}
          tipo="text"
          titulo="Data de Validade"
          name="validade"
          handle={handleChange}
        />
      </S.DivWrapper>
      <BtnStyled onClick={handleSave} type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarEpi;
