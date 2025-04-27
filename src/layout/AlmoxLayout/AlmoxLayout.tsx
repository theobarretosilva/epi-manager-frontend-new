import { Outlet } from "react-router";
import { Headerbar } from "../../components/Headerbar/Headerbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const AlmoxLayout = () => {
    const linksAlmoxLayout = [
        {title: 'Solicitações', href: '/almoxarifado/dashboardAlmox', image: '../../src/assets/img/document.png'},
        {title: 'Consultar colaborador', href: '/almoxarifado/consultColab', image: '../../src/assets/img/user.png'},
        {title: 'Consultar EPI', href: '/almoxarifado/consultEPI', image: '../../src/assets/img/setting.png'}
    ];

    return(
        <>
            <Headerbar />
            <Sidebar links={linksAlmoxLayout} />
            <Outlet />
        </>
    )
}