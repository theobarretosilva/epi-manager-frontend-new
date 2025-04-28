import { useNavigate } from "react-router"
import * as S from "./Sidebar.styles"
import { toast } from "react-toastify";
import { SidebarProps } from "./Sidebar.types";

export const Sidebar: React.FC<SidebarProps> = ({links, onClick}) => {
    const navigate = useNavigate();

    const logout = () => {
        toast.success("Fazendo logout em 3.. 2.. 1..", { autoClose: 2000 })
        sessionStorage.setItem('TipoAcesso', "");
        setTimeout( () => navigate("/"), 2500);
    };

    return (
        <S.SidebarWrapper>
            <S.SidebarContent>
                <S.SidebarTitle>Atividades</S.SidebarTitle>
                <S.SidebarHr/>
                <ul>
                {links.map((elements, index)=> (
                        <S.LinkSidebarWrapper key={index} onClick={onClick}>
                            <S.LinkSidebarContent href={elements.href}>
                            <S.ImageContent>
                                    <S.Image src={elements.image} />
                            </S.ImageContent>
                            <S.TextLink>{elements.title}</S.TextLink>
                            </S.LinkSidebarContent>
                            
                        </S.LinkSidebarWrapper>
                ))}
                </ul>
            <S.Logout onClick={logout}>Encerrar Sessão</S.Logout> 
            </S.SidebarContent>
        </S.SidebarWrapper>
    )
}