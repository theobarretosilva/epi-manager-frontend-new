import styled from 'styled-components'

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

export const InputStyled = styled.input`
    background-color: #EDEDED;
    border: 2px solid black;
    height: 5vh;
    border-radius: 6px;
    margin-top: 0;
    font-size: 1.2rem;
    color: black;
    padding-left: 0.8vw;

    ::placeholder{
        color: #9C9C9C;
    }
`
export interface InputDisableProps {
    text: string | undefined | Date | number; 
    title: string; 
    type: string;
    name?: string;
  }