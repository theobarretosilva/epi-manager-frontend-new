import { useNavigate } from "react-router"
import * as S from "./Usuarios.styles"
import AlmoxarifadoImg from "../../assets/img/almoxarifado.png";
import FuncionarioImg from "../../assets/img/funcionario.png";
import AdminImg from "../../assets/img/admin.png";
import AsideLoginImg from "../../assets/img/aside_login.jpg";
import LogoImg from "../../assets/img/logo.png";
import { UserRoles } from "../../constants/UserRoles";
import { useEffect } from "react";

export const Usuarios = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("UserLogado");
        if (!storedUser) {
            const defaultAdmin = {
                matricula: '01',
                salt: '861918edf24cc72e2536a8b254a0f692',
                hash: 'af067cef1a2dd778c535f67aa3acde28c8b33db518b3d8a384943f6069c3f648',          
                tipoAcesso: 'Administrador',
                cargo: 'Administrador',
                email: 'admin_master@gmail.com',
                id: '01',
                nome: 'Administrador Master',
                setor: 'Soldagem'
            };
            sessionStorage.setItem("UserLogado", JSON.stringify(defaultAdmin));
    
            const colaboradoresList = JSON.parse(sessionStorage.getItem("ColaboradoresCadastrados") || "[]");
            
            sessionStorage.setItem("ColaboradoresCadastrados", JSON.stringify([...colaboradoresList, defaultAdmin]));
        }
    }, []);
    

    const userOptions = [
        { label: 'Almoxarifado', role: UserRoles.ALMOXARIFADO, img: AlmoxarifadoImg },
        { label: 'Funcionário', role: UserRoles.COLABORADOR, img: FuncionarioImg },
        { label: 'Administrador', role: UserRoles.ADMINISTRADOR, img: AdminImg },
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
