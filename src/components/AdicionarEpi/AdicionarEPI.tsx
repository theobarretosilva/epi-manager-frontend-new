import React, { useState, useEffect } from "react";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import * as S from "./AdicionarEpi.styles";
import { toast } from "react-toastify";
import { InputStyled } from "../InputStyled/InputStyled";

const AdicionarEpi: React.FC<S.AddEPIProps> = ({ setModalIsOpen, modalIsOpen, idEpi }) => {
  const epis = JSON.parse(sessionStorage.getItem("EPIsCadastrados") || "[]");
  const [descricaoItem, setDescricaoItem] = useState("");
  const [codigo, setCodigo] = useState("");
  const [certificadoAprovacao, setCertificadoAprovacao] = useState("");
  const [validade, setValidade] = useState("");
  const [linkFoto, setLinkFoto] = useState("");

  useEffect(() => {
    if (modalIsOpen && idEpi) {
      const epi = epis.find((epi: any) => epi.id === idEpi);
      if (epi) {
        setDescricaoItem(epi.descricaoItem);
        setCodigo(epi.codigo);
        setCertificadoAprovacao(epi.certificadoAprovacao);
        setValidade(epi.validade);
        setLinkFoto(epi.linkFoto);
      }
    } else {
      setDescricaoItem(" ");
      setCodigo(" ");
      setCertificadoAprovacao(" ");
      setValidade(" ");
      setLinkFoto(" ")
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
        {
          const sanitized = value.startsWith("CA") ? value : `CA${value.replace(/^CA/i, "")}`;
          setCertificadoAprovacao(sanitized);
        }
        break;
      case "validade":
        {
          let input = value.replace(/\D/g, '');
          if (input.length > 8) input = input.slice(0, 8);
        
          let formatted = input;
          if (input.length > 4) {
            formatted = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
          } else if (input.length > 2) {
            formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
          }
        
          setValidade(formatted);
        }
        break;
      case "linkFoto":
        setLinkFoto(value);
        break;
      default:
        break;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricaoItem || !codigo || !certificadoAprovacao || !validade || !linkFoto) {
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
          linkFoto
        };

        if (idEpi) {
          const index = epis.findIndex((e: any) => e.id === idEpi);
          if (index !== -1) epis[index] = epi;
        } else {
          epis.push(epi);
        }

        sessionStorage.setItem("EPIsCadastrados", JSON.stringify(epis));
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
          onChange={handleChange}
        />
        <InputStyled
          value={codigo}
          tipo="text"
          titulo="Código"
          name="codigo"
          onChange={handleChange}
        />
        <InputStyled
          value={certificadoAprovacao}
          tipo="text"
          titulo="Certificado de Aprovação"
          name="certificadoAprovacao"
          onChange={handleChange}
        />
        <InputStyled
          value={validade}
          tipo="text"
          titulo="Data de Validade"
          name="validade"
          onChange={handleChange}
        />
        <InputStyled 
          value={linkFoto}
          tipo="url"
          titulo="Link da foto"
          name="linkFoto"
          onChange={handleChange}
        />
      </S.DivWrapper>
      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarEpi;
