import { Outlet } from "react-router";
import { Headerbar } from "../../components/Headerbar/Headerbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import * as S from './FuncLayout.styles';
import { toast } from "react-toastify";

import documentIcon from "../../assets/img/document.png";
import settingIcon from "../../assets/img/setting.png";

export function FuncLayout() {
    const EPIsCadastrados = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');

    const linksFuncLayout = [
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
                    toast.success("Abrindo solicitação de EPI!");
                }
            }
        }
    ];

    return (
        <>
            <Headerbar />
            <S.DivRow>
                <Sidebar links={linksFuncLayout} />
                <Outlet />
            </S.DivRow>
        </>
    );
}
