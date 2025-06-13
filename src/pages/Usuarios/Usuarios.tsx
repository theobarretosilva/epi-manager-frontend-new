import { useNavigate } from "react-router"
import * as S from "./Usuarios.styles"
import AlmoxarifadoImg from "../../assets/img/almoxarifado.png";
import ColaboradorImg from "../../assets/img/colaborador.png";
import AdminImg from "../../assets/img/admin.png";
import AsideLoginImg from "../../assets/img/aside_login.jpg";
import LogoImg from "../../assets/img/logo.png";
import { UserRoles } from "../../constants/UserRoles";

export const Usuarios = () => {
    const navigate = useNavigate();
    
    const userOptions = [
        { label: 'Colaborador', role: UserRoles.COLABORADOR, img: ColaboradorImg },
        { label: 'Almoxarifado', role: UserRoles.ALMOXARIFADO, img: AlmoxarifadoImg },
        { label: 'Administrador', role: UserRoles.ADMIN, img: AdminImg },
    ];

    return(
        <S.DivWrapper>
            <S.ImgAside src={AsideLoginImg} />
            <S.Divider />
            <S.MainStyled>
                <S.ImgLogo src={LogoImg} />
                <h1>Escolha um usuário para ingressar</h1>
                <S.DivButton>
                    {userOptions.map(({ label, role, img }) => (
                        <S.Button
                            key={role}
                            onClick={() => {
                                sessionStorage.setItem('TipoAcesso', role);
                                navigate("/login");
                            }}
                        >
                            <S.ImgButton src={img} />
                            <h2>{label}</h2>
                        </S.Button>
                    ))}
                </S.DivButton>
            </S.MainStyled>
        </S.DivWrapper>
    );
};
