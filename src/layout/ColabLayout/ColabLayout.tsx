import { Outlet, useNavigate } from "react-router";
import { Headerbar } from "../../components/Headerbar/Headerbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import * as S from './ColabLayout.styles';
import { toast } from "react-toastify";

import documentIcon from "../../assets/img/document.png";
import settingIcon from "../../assets/img/setting.png";

export function ColabLayout() {
    const navigate = useNavigate();
    const EPIsCadastrados = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');

    const linksColabLayout = [
        { 
            title: 'Solicitações',
            href: '/colaborador/solicitacoes',
            image: documentIcon,
            onClick: undefined
        },
        {
            title: 'Solicitar EPI',
            href: '/colaborador/solicitarEPI',
            image: settingIcon,
            onClick: () => {
                if (EPIsCadastrados.length === 0) {
                    toast.error("Não existem EPI's cadastrados, contate o Administrador!");
                } else {
                    toast.success("Abrindo solicitação de EPI!", { autoClose: 2000 });
                    navigate('/colaborador/solicitarEPI');
                }
            }
        }
    ];

    return (
        <>
            <Headerbar />
            <S.DivRow>
                <Sidebar links={linksColabLayout} />
                <Outlet />
            </S.DivRow>
        </>
    );
}