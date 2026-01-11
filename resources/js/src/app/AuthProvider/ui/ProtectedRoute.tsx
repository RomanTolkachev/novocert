import { Navigate, useLocation } from "react-router-dom";
import { use, type FC, type PropsWithChildren, type ReactNode } from "react";
import { AuthContext, Preloader } from "@/shared";



const ProtectedRoute: FC<PropsWithChildren<{ onlyUnAuth: boolean }>> = ({ onlyUnAuth = false, children }) => {

    const location: { state?: { from?: { pathname: string } } } = useLocation();
    const { authenticated, isFetched } = use(AuthContext);

    if (!isFetched) {
        return <Preloader />
    }

    if (onlyUnAuth && authenticated) {
        const { from } = location.state || { from: { pathname: "/personal" } }
        return <Navigate to={from!} />
    }

    if (!onlyUnAuth && !authenticated) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children;
}

type GuardProps = {
    forRoles: string[]
    giveComponent: ReactNode
}
export const RoleGuard: FC<PropsWithChildren<GuardProps & { defaultComponent: ReactNode }>> = ({ giveComponent, defaultComponent, forRoles = [] }) => {

    const { userData } = use(AuthContext);

    if (!userData) {
        return <>сюда нельзя</>
    }

    if (!forRoles.length) {
        return defaultComponent;
    }

    const hasRequiredRole = forRoles.some(role =>
        userData.role_names.includes(role)
    );

    if (hasRequiredRole) {
        return giveComponent;
    }

    return defaultComponent;
}

export const OnlyAuth: FC<PropsWithChildren<{ guardProps?: GuardProps }>> = ({ children, guardProps }) => {

    if (guardProps) {
        return <RoleGuard defaultComponent={children}  {...guardProps} />
    }
    return (
        <ProtectedRoute onlyUnAuth={false}>
            {children}
        </ProtectedRoute>
    )

};

export const OnlyUnAuth: FC<PropsWithChildren> = ({ children }) => (
    <ProtectedRoute onlyUnAuth={true}>{children}</ProtectedRoute>
);