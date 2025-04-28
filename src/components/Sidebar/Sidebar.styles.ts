import styled from 'styled-components'

export const SidebarWrapper = styled.nav`
  position: fixed;
  top: 13Vh;
  left: 0;
  bottom: 0;
  width: 390px;
  background-color: #90C9D3;

    @media (max-width: 768px) {
    width: 100vw;
    height: 75vh;
    }

    @media (max-height: 600px) {
    width: 100vw;
    height: 90vh;
    }

    li {
        list-style-type: none;

    }

    ul {
        padding: 0;
        :hover {
            transform: scale(0.95); 
        }
    }
    
`
export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 25px;
`

export const SidebarTitle = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: start;
  color: #FFDD4A;
  margin-block-end: 0;
`

export const SidebarHr = styled.hr`
  border: 1px solid #FFDD4A;
  margin: 20px 0;
`

export const LinkSidebarWrapper = styled.li`
    margin-top: 15px;
    width: 100%;
    background-color: #FCFCFC;
    border-radius: 15px;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-align: center;


`

export const LinkSidebarContent = styled.a`
    display: flex;
    padding: 20px;
    align-items: center;  
    text-decoration: none;
`

export const ImageContent = styled.div`
    width: 32px;
`

export const Image = styled.img`
    width: 100%;
`

export const TextLink = styled.h2`
    color: black;
    font-size: 15px;
    font-weight: 400;
    margin-left: 15px;
`

export const Logout = styled.a`
  height: 19px;
  left: 60px;
  color: #000;
  cursor: pointer;
  font-size: 18px;
  margin: 20px;
  text-align: end;
  font-style: italic;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #042A2B;

  &:hover {
    color: #FFDD4A;
  }

  &:active {
    background-color: transparent;
  }
`