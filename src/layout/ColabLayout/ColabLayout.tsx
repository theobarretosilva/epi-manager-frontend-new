import { Outlet } from "react-router";
import { Headerbar } from "../../components/Headerbar/Headerbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import * as S from './ColabLayout.styles';

import documentIcon from "../../assets/img/document.png";
import settingIcon from "../../assets/img/setting.png";

export function ColabLayout() {

    const linksColabLayout = [
        { 
            title: 'Solicitações',
            href: '/colaborador/solicitacoes',
            image: documentIcon,
            onClick: undefined
        },
        {
            title: 'EPIs',
            href: '/colaborador/consultEPI',
            image: settingIcon,
            onClick: undefined
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