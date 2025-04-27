import { Outlet } from "react-router";
import { Headerbar } from "../../components/Headerbar/Headerbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export function AdminLayout() {
    const linksAdminLyout = [
        {title: 'Solicitações', href: '/administrador/solicitacoes', image: '../../src/assets/img/document.png'},
        {title: 'Gerenciar Colaboradores', href: '/administrador/dashboardFuncionario', image: '../../src/assets/img/user.png'},
        {title: 'Gerenciar EPIs', href: '/administrador/dashboardEPI', image: '../../src/assets/img/setting.png'}
    ];

    return(
        <>
            <Headerbar />
            <Sidebar links={linksAdminLyout} />
            <Outlet />
        </>
    )
}