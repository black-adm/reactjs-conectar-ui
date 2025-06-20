import { GoogleLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components/Button";
import { AuthService } from "../../services/auth";

export function GoogleSignIn() {
  const [isPending, setIsPending] = useState(false);

  const googleSignIn = async () => {
    try {
      setIsPending(true)
      return await AuthService.googleSignIn();
    } catch {
      toast.error("Erro ao tentar fazer login com sua conta Google! Tente novamente.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center gap-2"
        disabled={isPending}
        onClick={() => googleSignIn()}
      >
        <GoogleLogoIcon className="size-5" />
        Login com o Google
      </Button>
    </div>
  )
}