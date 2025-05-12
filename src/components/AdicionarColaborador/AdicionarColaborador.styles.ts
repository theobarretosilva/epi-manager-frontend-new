import styled from "styled-components";

export const FormContainer = styled.form`
  max-width: 600px;
  padding: 4vh 1vw 4vh 1vw;
  background-color: transparent;
  border-radius: 8px;
  width: 60vw;
  height: 80vh;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export const DivWrapper = styled.div`
  margin-bottom: 3vh;
  display: flex;
  flex-wrap: wrap;
  gap: 1vh;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export interface Colaborador {
  id: string;
  nome: string;
  matricula: string;
  setor: string;
  cargo: string;
  email: string;
  hash: string;
  salt: string;
}


export interface AddColaboradorProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd: (e: Colaborador) => void;
  idColab?: string;
  modalIsOpen: boolean;
}

