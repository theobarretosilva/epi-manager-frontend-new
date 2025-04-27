import React, { useState, useEffect } from "react";
import * as S from "./AdicionarColaborador.styles"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputStyled } from "../InputStyled/InputStyled";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { SelectStyled } from "../SelectStyled/SelectStyled";

interface ColaboradorProps {
  id: string;
  nome: string; 
  matricula: string;
  setor: string;
  cargo: string;
  email: string;
  hash: string;
  salt: string;
}

const AdicionarColaborador: React.FC<S.AddColaboradorProps> = ({ setModalIsOpen, onAdd, idColab, modalIsOpen }) => {
  const colaboradores = JSON.parse(sessionStorage.getItem('ColaboradoresCadastrados') || '[]');
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [setor, setSetor] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (modalIsOpen) {
      if (idColab) {
        const colaborador = colaboradores.find((colaborador: ColaboradorProps) => colaborador.id === idColab);
        if (colaborador) {
          setNome(colaborador.nome);
          setMatricula(colaborador.matricula);
          setSetor(colaborador.setor);
          setCargo(colaborador.cargo);
          setEmail(colaborador.email);
          setSenha(colaborador.hash || "");
        }
      } else {
        setNome("");
        setMatricula("");
        setSetor("");
        setCargo("");
        setEmail("");
        setSenha("");
      }
    }
  }, [idColab, modalIsOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "nome":
        setNome(value);
        break;
      case "matricula":
        setMatricula(value);
        break;
      case "setor":
        setSetor(value);
        break;
      case "cargo":
        setCargo(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "senha":
        setSenha(value);
        break;
      default:
        break;
    }
  };

  const generateHashWithSalt = async (password: string) => {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const passwordBytes = encoder.encode(password);
    const combined = new Uint8Array([...passwordBytes, ...salt]);

    const hashBuffer = await crypto.subtle.digest("SHA-256", combined);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const saltHex = Array.from(salt).map((b) => b.toString(16).padStart(2, "0")).join("");

    return { hash: hashHex, salt: saltHex };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !matricula || !setor || !cargo || !email || (!senha && !idColab)) {
      toast.warning("Por favor, preencha todos os campos.", { autoClose: 6000 });
      return;
    }

    try {
      const { hash, salt } = senha ? await generateHashWithSalt(senha) : { hash: null, salt: null };

      const colaborador = {
        id: idColab || matricula,
        nome,
        matricula,
        setor,
        cargo,
        email,
        hash: hash || colaboradores.find((col: any) => col.id === idColab)?.hash,
        salt: salt || colaboradores.find((col: any) => col.id === idColab)?.salt,
      };

      if (!idColab) {
        const existe = colaboradores.some((col: ColaboradorProps) => col.matricula === matricula);
        if (existe) {
          toast.error("Colaborador já cadastrado com esta matrícula.");
          return;
        }
        colaboradores.push(colaborador);
      } else {
        const index = colaboradores.findIndex((col: ColaboradorProps) => col.id === idColab);
        if (index !== -1) colaboradores[index] = colaborador;
      }

      sessionStorage.setItem("ColaboradoresCadastrados", JSON.stringify(colaboradores));
      onAdd(colaborador);
      setNome(" ");
      toast.success(idColab ? "Colaborador atualizado!" : "Colaborador adicionado!");
      setModalIsOpen(false);
      setMatricula(" ");
      setSetor(" ");
      setCargo(" ");
      setEmail(" ");
      setSenha(" ");
      console.log(nome)
    } catch (error) {
      console.error("Erro ao gerar o hash:", error);
      toast.error("Erro ao salvar colaborador.");
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.DivWrapper>
        <InputStyled value={nome} tipo="text" titulo="Nome Completo" name="nome" handle={handleChange} />
        <InputStyled value={matricula} tipo="text" titulo="Matrícula" name="matricula" handle={handleChange} />
        <InputStyled value={setor} tipo="text" titulo="Setor" name="setor" handle={handleChange} />
        <SelectStyled value={cargo} titulo="Cargo" name="cargo" onChange={(value) => setCargo(value)} options={["Administrador", "Almoxarifado", "Colaborador"]} />
        <InputStyled value={email} tipo="email" titulo="Email" name="email" handle={handleChange} />
        {!idColab && <InputStyled value={senha} tipo="password" titulo="Senha" name="senha" handle={handleChange} />}
      </S.DivWrapper>
      <BtnStyled onClick={handleSubmit} type="submit" text="Salvar" />
    </S.FormContainer>
  );
};

export default AdicionarColaborador;
