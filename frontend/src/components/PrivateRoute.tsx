import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({children}: PrivateRouteProps) {
    if (!isLoggedIn()) {
        return <Navigate to="/" replace/>
    }

    return children
}