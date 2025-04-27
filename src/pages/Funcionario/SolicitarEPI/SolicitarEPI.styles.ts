import styled from "styled-components";

export const MainStyled = styled.main`
    width: 100vw;
    height: 87vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: #E4F0F2;
`

export const DivMainSolicitar = styled.form`
    width: 55vw;
    height: 60vh;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 20px;
    padding: 2.5vh 2.5vw 2.5vh 2.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3vh;
`

export const DivFlex = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.1vw;
`

export const PVoltar = styled.p`
    color: #FFDD4A;
    font-size: 1.2rem;
    font-weight: 400;
    text-decoration: underline;
    text-align: center;
    font-style: italic;
    margin: 0;
    cursor: pointer;
`