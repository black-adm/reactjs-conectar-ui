import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { twMerge } from "../../lib/utils";
import { registerSchema } from "./schema";

export function RegisterForm() {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async data => {
    try {
      await signUp(data);
      toast.success('Cadastro efetuado com sucesso!');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Erro ao tentar criar sua conta! Tente novamente.');
    }
  });

  return (
    <form className="flex flex-col gap-6 py-12" onSubmit={onSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Cadastrar sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Preencha corretamente todas as informações
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <label htmlFor="full-name">Nome completo</label>
          <Input
            id="full-name"
            placeholder="Informe seu nome"
            autoComplete="full-name"
            autoCorrect="off"
            autoCapitalize="off"
            maxLength={100}
            className={twMerge(
              errors && errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            {...register("name")}
          />
        </div>
        {errors && errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
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
          {isSubmitting ? <SpinnerGapIcon className="size-6 animate-spin" /> : "Cadastrar"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Já possui cadastro?{" "}
        <a href="/login" className="text-peach-main underline underline-offset-4 hover:text-green-main">
          Fazer login
        </a>
      </div>
    </form>
  )
}