import styled from "styled-components";

export const DivGeral = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 calc(50% - 10px);
    gap: 0.5vh;
    width: 100%;
`

export const NameInput = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0;
    margin-top: 1vh;
`

export const InputStyled = styled.select`
    background-color: white;
    border: 2.5px solid black;
    height: 5.8vh;
    border-radius: 6px;
    margin-top: 0;
    font-size: 1.2rem;
    color: black;
    padding-left: 0.8vw;

    ::placeholder{
        color: #9C9C9C;
    }

    :disabled {
        color: #000; 
        background-color: #EDEDED; 
        opacity: unset;
        border: 1px solid #ccc; 
        cursor: not-allowed; 
        -webkit-appearance: none;
        -moz-appearance: none;   
        appearance: none; 
    }
`