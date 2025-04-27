import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: JSX.Element;
    roles: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
    const userRole = sessionStorage.getItem("TipoAcesso");

    if (userRole && roles.includes(userRole)) {
        return element;
    }

    return <Navigate to="/login" replace />;
};
