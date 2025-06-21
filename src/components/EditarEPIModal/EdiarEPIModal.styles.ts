import styled from "styled-components";

export const FormContainer = styled.form`
  max-width: 600px;
  padding: 2rem;
  background-color: transparent;
  border-radius: 8px;
  height: auto;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export const DivWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap; 
  gap: 1vh;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;

export const DivInputs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2vw;
`
