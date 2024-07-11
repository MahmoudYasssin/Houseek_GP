import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const RequireAuth = ({allowedRoles}) => {
    const { auth,signin, setsignin } = useAuth()
    const location = useLocation();

    useEffect(() => {
        if (!sessionStorage.getItem("username")) {
            setsignin(!signin);
        }
    }, [auth, signin, setsignin]);

    if (!allowedRoles.includes(sessionStorage.getItem("role")) ) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default RequireAuth;