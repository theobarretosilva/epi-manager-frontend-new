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
export const MainWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: end;
`

export const DivBtnSearch = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    width: 100%;
`

export const DivLayoutDash = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: auto;
    margin-top: 2vh;
`

export const FotoEPI = styled.img`
    width: 64%;
    height: 100%;
    object-fit: cover;
    align-self: center;
    border-radius: 999px;
`

export const DivDownload = styled.div`
    width: 21vw;
    height: 4.9vh;
    border-radius: 5px;
    border: 1px solid #FFDD4A;
    margin-right: 1vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
`

export const TextDownload = styled.p`
    font-size: 1rem;
    font-weight: 500;
`