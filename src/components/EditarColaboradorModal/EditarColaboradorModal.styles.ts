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

export const DivInputs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2vw;
`