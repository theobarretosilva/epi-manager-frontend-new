import { Outlet } from "react-router";
import { Headerbar } from "../../components/Headerbar/Headerbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import * as S from './FuncLayout.styles';
import { toast } from "react-toastify";

export function FuncLayout() {
    const EPIsCadastrados = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');

    const linksFuncLayout = [
        { 
            title: 'Solicitações',
            href: '/funcionario/solicitacoes',
            image: '../../src/assets/img/document.png',
        },
        {
            title: 'Solicitar EPI',
            href: '/funcionario/solicitarEPI',
            image: '../../src/assets/img/setting.png',
            onclick: () => {
                if (EPIsCadastrados === "[]") {
                    toast.error("Não existem EPI's cadastrados, contate o Administrador!");
                } else {
                    toast.success("Abrindo solicitação de EPI!")
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
