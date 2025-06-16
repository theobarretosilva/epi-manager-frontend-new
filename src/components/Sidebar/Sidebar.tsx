import { useNavigate } from "react-router"
import * as S from "./Sidebar.styles"
import { toast } from "react-toastify";
import { SidebarProps } from "./Sidebar.types";

export const Sidebar: React.FC<SidebarProps> = ({ links }) => {
    const navigate = useNavigate();

    const logout = () => {
        toast.success("Fazendo logout em 3.. 2.. 1..", { autoClose: 2000 });
        sessionStorage.removeItem('TipoAcesso');
        sessionStorage.removeItem('EpiManagerToken')
        setTimeout(() => navigate("/login"), 2500);
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, onClick?: () => void) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <S.SidebarWrapper>
            <S.SidebarContent>
                <S.SidebarTitle>Funções</S.SidebarTitle>
                <S.SidebarHr />
                <ul>
                    {links.map((element, index) => (
                        <S.LinkSidebarWrapper key={index}>
                            <S.LinkSidebarContent
                                href={element.href}
                                onClick={(e) => handleClick(e, element.onClick)}
                            >
                                <S.ImageContent>
                                    <S.Image src={element.image} />
                                </S.ImageContent>
                                <S.TextLink>{element.title}</S.TextLink>
                            </S.LinkSidebarContent>
                        </S.LinkSidebarWrapper>
                    ))}
                </ul>
                <S.Logout onClick={logout}>Encerrar Sessão</S.Logout>
            </S.SidebarContent>
        </S.SidebarWrapper>
    );
};