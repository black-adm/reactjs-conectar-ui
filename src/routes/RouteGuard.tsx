import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RouteGuardProps {
  requiredRole: string;
}

export function RouteGuard({ requiredRole }: RouteGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (user?.role !== requiredRole.replace('/', '')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}