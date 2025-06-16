import styled from "styled-components";

export const MainStyled = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 71.5vw;
    padding: 1.5vh 1.5vw 1.5vh 1.5vw;
    margin-left: 25.4vw;
`

export const ImageContent = styled.button`
    width: 32px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`

export const Image = styled.img`
    width: 100%;
`

export const ButtonStyled = styled.button`
    background-color: #FFDD4A;
    width: 20vw;
    height: 4.9vh;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 5px;
    border: none;
    font-size: 1.15rem;
    font-weight: 600;
    cursor: pointer;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
    margin-top: 0;
    margin-left: 1vw;
`

export const DivBtnSearch = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    width: 100%;
`

export const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: end;
`

export const DivWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px; 
    width: 700px;
`

export const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        padding: "25px",
        borderRadius: "10px",
        backgroundColor: "#FCFCFC",
    },
};

export const ModalContent = styled.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    color: #555;
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  button {
    padding: 10px 20px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 6px;
    border: none;
    transition: background-color 0.3s ease;

    &:hover {
      filter: brightness(0.9);
    }

    &:focus {
      outline: 2px solid #3f51b5;
      outline-offset: 2px;
    }
  }

  button:first-child {
    background-color: #4caf50;
    color: white;
  }

  button:last-child {
    background-color: transparent;
    color: #4caf50;
    border: 2px solid #4caf50;
  }
`;
