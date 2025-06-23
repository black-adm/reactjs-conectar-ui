import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const { signedIn, loading, user } = useAuth();

  const location = useLocation();

  if (loading) return <div>Carregando...</div>;

  if (location.pathname === '/auth/success') {
    return <Outlet />;
  }

  if (!isPrivate) {
    if (signedIn) {
      if (user?.role === 'admin') return <Navigate to="/admin" replace />;
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  }

  if (isPrivate) {
    if (!signedIn) return <Navigate to="/login" replace />;
    return <Outlet />;
  }

  return <Outlet />;
}