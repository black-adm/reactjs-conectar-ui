import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { twMerge } from "../../lib/utils";
import { GoogleSignIn } from "./GoogleSignIn";
import { loginSchema } from "./schema";

export function LoginForm() {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async data => {
    try {
      await signIn(data);
      toast.success('Login efetuado com sucesso!');
    } catch {
      toast.error('Erro ao tentar acessar o sistema! Tente novamente.');
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <main>
        <div className="flex flex-col items-center space-y-1.5 py-6">
          <h2 className="text-2xl font-semibold">Acesso interno</h2>
          <p className="text-gray-light text-center truncate">
            Entre com o google ou insira suas credenciais de acesso.
          </p>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <GoogleSignIn />
              <div className="after:border-gray-lighter relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-white text-gray-light relative z-10 px-4">
                  Ou continue com
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="current-email"
                    type="email"
                    placeholder="Informe seu e-mail"
                    autoComplete="current-email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    maxLength={100}
                    className={twMerge(
                      errors && errors.email && "border-red-500 focus-visible:ring-red-500"
                    )}
                    {...register("email")}
                  />
                </div>
                {errors && errors.email && (
                  <span className="text-sm text-red-500">{errors.email.message}</span>
                )}
                <div className="grid gap-3">
                  <label htmlFor="password">Senha</label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    maxLength={60}
                    className={twMerge(
                      errors && errors.password && "border-red-500 focus-visible:ring-red-500"
                    )}
                    {...register("password")}
                  />
                </div>
                {errors && errors.password && (
                  <span className="text-sm text-red-500">{errors.password.message}</span>
                )}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <SpinnerGapIcon className="size-6 animate-spin" /> : "Entrar"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Não possui uma conta?{" "}
                <a href="/cadastrar" className="text-peach-main underline underline-offset-4 hover:text-green-main">
                  Cadastrar
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}