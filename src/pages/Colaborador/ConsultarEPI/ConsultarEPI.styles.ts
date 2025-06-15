import styled from "styled-components";

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

export const FotoEPI = styled.img`
    width: 64%;
    height: 100%;
    object-fit: cover;
    align-self: center;
    border-radius: 999px;
`

export const MainStyled = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 71.5vw;
    padding: 1.5vh 1.5vw 1.5vh 1.5vw;
    margin-left: 25.4vw;
`

export const DivBtnSearch = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    width: 100%;
`

export const ButtonStyled = styled.button`
    background-color: #FFDD4A;
    width: 17vw;
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

