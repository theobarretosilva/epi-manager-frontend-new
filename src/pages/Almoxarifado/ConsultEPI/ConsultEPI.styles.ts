import styled from "styled-components";

export const MainStyled = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 66.6vw;
    padding: 7vh 3vw 7vh 3vw;
    margin-left: 25.4vw;
`

export const ButtonStyled = styled.button`
    background-color: #FFDD4A;
    width: 13vw;
    height: 4.9vh;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 5px;
    align-self: flex-start;
    border: none;
    font-size: 1.15rem;
    font-weight: 600;
    cursor: pointer;
`

export const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: end;
`

export const ImageContent = styled.button`
    width: 32px;
    background-color: transparent;
    border: none;
    outline: none;
`

export const Image = styled.img`
    width: 100%;
    cursor: pointer;
`
export const DivWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px; 
    width: 700px;
`