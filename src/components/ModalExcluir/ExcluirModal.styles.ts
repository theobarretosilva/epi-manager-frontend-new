import styled from "styled-components";

export const DivContainer = styled.div`
  max-width: 600px;
  margin-top: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export const TituloBox = styled.h1`
    font-size: 1.7rem;
    font-weight: 600;
    margin: 0;

    @media (max-width: 450px) {
        font-size: 1.5rem;
    }
`

export const SubtituloBox = styled.h2`
    font-size: 1.3rem;
    font-weight: 400;
    margin: 0;

    @media (max-width: 450px) {
        font-size: 1.2rem;
    }
`

export const DivButton = styled.div`
  max-width: 600px;
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export const ButtonCancel = styled.button`
    background-color: #FFDD4A;
    width: 100%;
    height: 6vh;
    border-radius: 7px;
    font-size: 1.4rem;
    font-weight: 600;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
`

export const ButtonDelete = styled.button`
    background-color: #90C9D3;
    width: 100%;
    height: 6vh;
    border-radius: 7px;
    font-size: 1.4rem;
    font-weight: 600;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
`

export interface ExcluirProps {
  Id: string; 
  tipo: "colaborador" | "epi";
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (e: string) => void;
}
