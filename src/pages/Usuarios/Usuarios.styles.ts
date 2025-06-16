import styled from "styled-components";

export const DivWrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: 1250px) {
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
    }
`

export const ImgAside = styled.img`
    width: 50vw;
    object-fit: cover;

    @media (max-width: 1250px) {
    width: 100vw;
    }
`

export const Divider = styled.div`
    height: 100vh;
    width: 0.3vw;
    background-color: black;

    @media (max-width: 1250px) {
        display: flex;
        height: 0.5vh;
        width: 100vw;
    }
`
export const MainStyled = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    width: 50vw;
    background: linear-gradient(#FCFCFC, #5EB1BF);


    @media (max-width: 1250px) {
        width: 100vw;
        gap: 4vh;
        padding-bottom: 40px;
    }



    h1 {
        font-size: 1.8rem;
        font-weight: 600;
        @media (max-width: 550px) {
            font-size: 1.5rem;
        }  

        @media (max-width: 450px) {
            font-size: 1.2rem;
        } 
    }


`

export const ImgLogo = styled.img`
    height: 16vh;
    object-fit: contain;
    margin: 40px;


    @media (max-width: 450px) {
        height: 14vh;
    }
`

export const DivButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;

    :hover {
        transform: scale(0.95); 
    }

`

export const Button = styled.button`
    background-color: white;
    width: 600px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 15px;
    padding: 2vh 2vw 2vh 2vw;
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;

    @media (max-width: 650px) {
        width: 90vw;
    }

    h2 {
        font-weight: 400;
        margin-left: 20px;
    }

`

export const ImgButton = styled.img`
    height: 12vh;
    object-fit: contain;

    @media (max-width: 450px) {
        margin-top: 0;
        margin-bottom: 0;
        height: 10vh;
    }
`