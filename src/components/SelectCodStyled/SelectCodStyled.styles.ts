import styled from "styled-components";

export const DivGeral = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
    width: 100%;
`

export const NameInput = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0;
    margin-top: 1vh;
`

export const SelectStyled = styled.select`
    background-color: white;
    border: 1.5px solid black;
    height: 5.5vh;
    border-radius: 4px;
    margin-top: 0;
    font-size: 1.15rem;
    color: black;
    padding-left: 0.8vw;

    ::placeholder{
        color: #9C9C9C;
    }

    :disabled {
        background-color: #f5f5f5;
        color: #a0a0a0;
        cursor: not-allowed;
    }
`