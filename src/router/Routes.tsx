import { Route, Routes } from "react-router"
import { Login } from '../pages/Login/Login';
import { AdminLayout } from '../layout/AdminLayout/AdminLayout';
import { SolicitarEPI } from "../pages/Funcionario/SolicitarEPI/SolicitarEPI";
import { DashboardAlmox } from "../pages/Almoxarifado/DashboardAlmox/DashboardAlmox";
import { DashboardEPI } from "../pages/Administrador/DashboardEPI/DashboardEPI";
import { DashboardColab } from "../pages/Administrador/DashboardColab/DashboardColab";
import { FuncLayout } from "../layout/FuncLayout/FuncLayout";
import { AlmoxLayout } from "../layout/AlmoxLayout/AlmoxLayout";
import { Solicitacoes } from "../pages/Administrador/Solicitacoes/Solicitacoes";
import { ConsultColab } from "../pages/Almoxarifado/ConsultColab/ConsultColab";
import { ConsultEPI } from "../pages/Almoxarifado/ConsultEPI/ConsultEPI";
import { Usuarios } from "../pages/Usuarios/Usuarios";
import { ProtectedRoute } from "./ProtectedRoute";
import { SolicitacoesFunc } from "../pages/Funcionario/SolicitacoesFunc/SolicitacoesFunc";
import { EsqueciSenha } from "../pages/EsqueciSenha/EsqueciSennha";

export const Router = () => {
    return(
        <Routes>
            <Route index path="/" element={<Usuarios/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/esqueciSenha" element={<EsqueciSenha/>} />
            <Route path="/funcionario" element={<ProtectedRoute element={<FuncLayout />} roles={['Colaborador']} />}>
                <Route path="solicitacoes" element={<SolicitacoesFunc />} />
                <Route path="solicitarEPI" element={<SolicitarEPI />} />
            </Route>
            <Route path="/almoxarifado" element={<ProtectedRoute element={<AlmoxLayout />} roles={['Almoxarifado']} />} >
                <Route path="dashboardAlmox" element={<DashboardAlmox />} />
                <Route path="consultColab" element={<ConsultColab />} />
                <Route path="consultEPI" element={<ConsultEPI />} />
            </Route>
            <Route path="/administrador" element={<ProtectedRoute element={<AdminLayout />} roles={['Administrador']} />} >
                <Route path="solicitacoes" element={<Solicitacoes />} />
                <Route path="dashboardEPI" element={<DashboardEPI />} />
                <Route path="dashboardFuncionario" element={<DashboardColab />} />
            </Route>
            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>
    )
}