import { Route, Routes } from "react-router"
import { Login } from '../pages/Login/Login';
import { AdminLayout } from '../layout/AdminLayout/AdminLayout';
import { DashboardAlmox } from "../pages/Almoxarifado/DashboardAlmox/DashboardAlmox";
import { DashboardEPI } from "../pages/Administrador/DashboardEPI/DashboardEPI";
import { DashboardColab } from "../pages/Administrador/DashboardColab/DashboardColab";
import { AlmoxLayout } from "../layout/AlmoxLayout/AlmoxLayout";
import { Solicitacoes } from "../pages/Administrador/Solicitacoes/Solicitacoes";
import { ConsultColab } from "../pages/Almoxarifado/ConsultColab/ConsultColab";
import { ConsultEPI } from "../pages/Almoxarifado/ConsultEPI/ConsultEPI";
import { ProtectedRoute } from "./ProtectedRoute";
import { SolicitacoesFunc } from "../pages/Colaborador/SolicitacoesColab/SolicitacoesColab";
import { EsqueciSenha } from "../pages/EsqueciSenha/EsqueciSenha";
import { ColabLayout } from "../layout/ColabLayout/ColabLayout";
import { SolicitarEPI } from "../pages/SolicitarEPI/SolicitarEPI";

export const Router = () => {
    return(
        <Routes>
            {/* <Route path="/" element={<Usuarios/>} /> */}
            <Route index path="/login" element={<Login/>} />
            <Route path="/esqueciSenha" element={<EsqueciSenha/>} />

            <Route path="/colaborador" element={<ProtectedRoute element={<ColabLayout />} roles={['Colaborador']} />}>
                <Route path="solicitacoes" element={<SolicitacoesFunc />} />
                <Route path="solicitarEPI" element={<SolicitarEPI />} />
            </Route>

            <Route path="/almoxarifado" element={<ProtectedRoute element={<AlmoxLayout />} roles={['Almoxarifado']} />} >
                <Route path="dashboardAlmox" element={<DashboardAlmox />} />
                <Route path="consultColab" element={<ConsultColab />} />
                <Route path="consultEPI" element={<ConsultEPI />} />
                <Route path="solicitarEPI" element={<SolicitarEPI />} />
            </Route>

            <Route path="/administrador" element={<ProtectedRoute element={<AdminLayout />} roles={['ADMIN']} />} >
                <Route path="solicitacoes" element={<Solicitacoes />} />
                <Route path="dashboardEPI" element={<DashboardEPI />} />
                <Route path="dashboardColaborador" element={<DashboardColab />} />
                <Route path="solicitarEPI" element={<SolicitarEPI />} />
            </Route>

            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>
    )
}