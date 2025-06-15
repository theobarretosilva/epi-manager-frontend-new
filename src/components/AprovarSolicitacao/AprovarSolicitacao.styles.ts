import styled from "styled-components";

export const FormContainer = styled.form`
  max-width: 600px;
  padding: 2rem;
  background-color: transparent;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export const DivWrapper = styled.div`
  padding-bottom: 40px;
  display: flex;
  flex-wrap: wrap; 
  gap: 16px;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export const ButtonRecuse = styled.button`
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
export const DivFlex = styled.div`
  padding-bottom: 40px;
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export interface AprovarSolicitacoesProps {
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    onEdit?: (e) => void;
  }
