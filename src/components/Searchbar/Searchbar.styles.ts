import styled from "styled-components";

export const DivInput = styled.div`
    width: 100%;
    height: 5vh;
    border-bottom: 2px solid #FFDD4A;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;
    margin-top: 2vh;
    margin-left: 2vw;
    margin-right: 1vw;
`

export const SearchInputStyled = styled.input`
    border: none;
    font-size: 1.07rem;
    color: black;
    margin-left: 0.8vw;
    border-radius: 10px;
    width: 100%;
    outline: none;

    :focus{
        border: none;
    }
`

export const SearchIcon = styled.img`
    width: 3.4vw;
    height: 3.4vh;
`