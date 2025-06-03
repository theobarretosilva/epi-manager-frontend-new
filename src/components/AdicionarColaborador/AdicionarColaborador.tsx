import React, { useState, useEffect } from "react";
import * as S from "./AdicionarColaborador.styles"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputStyled } from "../InputStyled/InputStyled";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { SelectStyled } from "../SelectStyled/SelectStyled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemas } from "../../lib/yup/schemas";
import { ColaboradorForm } from "../../types/colaboradorForm";
import { TipoPermissao } from "../../enums/TipoPermissao";
import { boolean } from "yup";

interface ColaboradorProps {
  id: string;
  nome: string; 
  matricula: string;
  setor: string;
  cargo: string;
  email: string;
  hash: string;
  salt: string;
  linkFoto: string;
}

const AdicionarColaborador: React.FC<S.AddColaboradorProps> = ({ setModalIsOpen, onAdd, idColab, modalIsOpen, setIdColab }) => {
  const colaboradores = JSON.parse(sessionStorage.getItem('ColaboradoresCadastrados') || '[]');
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [setor, setSetor] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (!modalIsOpen) return;
  
    const resetCampos = () => {
      setNome("");
      setMatricula("");
      setSetor("");
      setCargo("");
      setEmail("");
      setSenha("");
    };
  
    if (idColab) {
      const colaborador = colaboradores.find((c: ColaboradorProps) => c.id === idColab);
      if (colaborador) {
        setNome(colaborador.nome);
        setMatricula(colaborador.matricula);
        setSetor(colaborador.setor);
        setCargo(colaborador.cargo);
        setEmail(colaborador.email);
        setSenha(colaborador.hash || "");

      }
    } else {
      resetCampos();
    }
  }, [idColab, modalIsOpen]);

  const defaultValues = {
    matricula: '',
    nome: '',
    cpf: '',
    cargo: '',
    setor: '',
    lideranca: true,
    dataCadastro: new Date(),
    matricula_lideranca: 0,
    nome_lideranca: '',
    permissao: TipoPermissao.COLABORADOR,
    senha: ''
  };

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ColaboradorForm>({
    resolver: yupResolver(schemas.colaboradorForm),
    defaultValues,
  })

  onAdd(colaborador);
  setNome("");
  toast.success(idColab ? "Colaborador atualizado!" : "Colaborador adicionado!");
  setModalIsOpen(false);
  setIdColab(null)
  setMatricula("");
  setSetor("");
  setCargo("");
  setEmail("");
  setSenha("");

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.DivWrapper>
        <InputStyled tipo="text" titulo="Nome Completo" {...register('nome')} />
        <InputStyled tipo="text" titulo="Matrícula" {...register('matricula')}  />
        <InputStyled tipo="text" titulo="CPF" {...register('cpf')}  />
        <InputStyled tipo="text" titulo="Setor" {...register('setor')} />
        <SelectStyled titulo="Cargo" {...register('cargo')} onChange={(value) => setCargo(value)} options={["Administrador", "Almoxarifado", "Colaborador"]} />
        <InputStyled tipo="email" titulo="Email" {...register('email')} />
        {!idColab && <InputStyled tipo="password" titulo="Senha" {...register('senha')} />}
      </S.DivWrapper>
      <BtnStyled type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarColaborador;
