import styled from "styled-components";

export const BoxForm = styled.div`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px;
    padding: 4vh 4vw 4vh 4vw;
    margin-bottom: 4vh;
    width: 400px;

    @media (max-width: 820px) {
        width: 65vw;
    }
`

export const TituloBox = styled.h1`
    font-size: 1.7rem;
    font-weight: 600;
    margin: 0;

    @media (max-width: 450px) {
        font-size: 1.5rem;
    }
`

export const SubtituloBox = styled.h2`
    font-size: 1.2rem;
    font-weight: 400;
    margin: 0;

    @media (max-width: 450px) {
        font-size: 1.2rem;
    }
`

export const SpaceDivider = styled.p`
    height: 0.5vh;
    @media (max-width: 450px) {
        height: 0vh;
    }
`

export const PVoltar = styled.p`
    font-size: 1.2rem;
    font-weight: 300;
    color: #FFDD4A;
    text-decoration: underline;
    cursor: pointer;
`

export const SpanStyled = styled.span`
    font-weight: 500;
    color: black;
`

export const FormInputCode = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const DivInputCode = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-top: 15px;
  margin-bottom: 5vh;
`;

export const InputCode = styled.input`
  width: 70px;
  height: 90px;
  border: 2px solid #000000;
  text-align: center;
  font-size: 5vw;

  -moz-appearance: textfield;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const PResendEmail = styled.p`
  font-weight: 400;
  font-size: 1rem;
  color: #303030;
  margin-top: 2.2vh;
  align-self: center;
`;