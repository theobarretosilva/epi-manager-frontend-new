import styled from "styled-components";

export const DivWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    gap: 2vh;
    background: linear-gradient(#FCFCFC, #5EB1BF);

`

export const ImgLogo = styled.img`
    height: 16vh;
    object-fit: contain;
    margin: 40px;


    @media (max-width: 650px) {
        height: 10vh;
        margin: 10px;
    }
`

export const BoxForm = styled.div`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px;
    padding: 4vh 4vw 4vh 4vw;
    margin-bottom: 4vh;
    width: 500px;

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
    font-size: 1.3rem;
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