import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: JSX.Element;
    roles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
    const userRole = sessionStorage.getItem("TipoAcesso")?.toLowerCase();

    if (userRole && roles.includes(userRole)) {
        return element;
    }

    return <Navigate to="/" replace />;
};
