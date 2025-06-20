import HomePage from "../pages/app/home/Index";
import ManagementPage from "../pages/app/management/Index";
import LoginPage from "../pages/login/Index";
import RegisterPage from "../pages/register/Index";

import { Navigate, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { RouteGuard } from "./RouteGuard";

export function RoutesApp() {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>

      <Route element={<AuthGuard isPrivate />}>
        <Route path="/" element={<HomePage />} />

        <Route element={<RouteGuard requiredRole="admin" />}>
          <Route path="/admin" element={<ManagementPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}