import toast from "react-hot-toast";

import { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { storageKeys } from "../../config/storageKeys";
import { UserService } from "../../services/user";

export default function AuthSuccessPage() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const getProfileData = useCallback(async () => {
    return await UserService.getProfileData();
  }, [])

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Falha no login com Google");
      navigate("/login");
    }

    localStorage.setItem(storageKeys.accessToken, token!);
    getProfileData();
    navigate("/");
  }, [searchParams, navigate, getProfileData]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processando seu login...</h1>
        <p>Por favor, aguarde enquanto redirecionamos você.</p>
      </div>
    </div>
  );
}