import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const { signedIn, loading, user } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (signedIn && !isPrivate) {
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/" replace />;
  }

  if (!signedIn && isPrivate) return <Navigate to="/login" replace />;

  return <Outlet />;
}
