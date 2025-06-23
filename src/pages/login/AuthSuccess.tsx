import toast from "react-hot-toast";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { storageKeys } from "../../config/storageKeys";
import { useAuth } from "../../hooks/useAuth";
import { UserService } from "../../services/user";

export default function AuthSuccessPage() {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleGoogleAuthSuccess = useCallback(async (token: string) => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      localStorage.setItem(storageKeys.accessToken, token);

      const userData = await UserService.getProfileData();

      localStorage.setItem(storageKeys.loggedUser, JSON.stringify(userData));
      setUser(userData);
      toast.success("Login realizado com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 100);

    } catch {
      toast.error("Erro ao processar login");

      localStorage.removeItem(storageKeys.accessToken);
      localStorage.removeItem(storageKeys.loggedUser);

      navigate("/login");
    } finally {
      setIsProcessing(false);
    }
  }, [navigate, setUser, isProcessing]);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      console.error("Token não encontrado na URL");
      toast.error("Falha no login com Google");
      navigate("/login");
      return;
    }

    handleGoogleAuthSuccess(token);
  }, [searchParams, navigate, handleGoogleAuthSuccess]);

  return (
    <div className="flex items-center justify-center h-screen">
      {isProcessing && (
        <div className="mt-4">
          <div className="animate-spin rounded-full size-8 border-b-2 border-gray-200 mx-auto"></div>
        </div>
      )}
    </div>
  );
}