import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  if (isLoggedIn()) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
