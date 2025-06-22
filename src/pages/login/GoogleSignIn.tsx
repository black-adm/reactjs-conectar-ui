import { GoogleLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../../components/Button";

export function GoogleSignIn() {
  const [isPending, setIsPending] = useState(false);

  const googleSignIn = async () => {
    setIsPending(true);
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/google/login`;
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