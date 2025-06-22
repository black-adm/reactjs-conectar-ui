import {
  passwordUpdateSchema,
  type PasswordUpdateFormData
} from "./schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

export function UserUpdate() {
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: PasswordUpdateFormData) => {
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Password update data:", data)

      setIsEditingPassword(false)
      reset()
      alert("Senha atualizada com sucesso!")
    } catch (error) {
      console.error("Error updating password:", error)
      alert("Erro ao atualizar senha. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditingPassword(false)
    reset()
  }

  return (
    <div className="rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">
          Senha de acesso
        </h3>

        {!isEditingPassword && (
          <Button
            type="button"
            size="sm"
            className="bg-peach-main text-sm px-4 hover:text-peach-main"
            onClick={() => setIsEditingPassword(true)}
          >
            Alterar senha
          </Button>
        )}
      </div>

      {!isEditingPassword ? (
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <p className="text-gray-light">
              Altere sua senha de acesso se necessário.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm text-gray-light font-medium mb-2">
              Minha senha atual
            </label>

            <PasswordInput
              id="current-password"
              placeholder="Informe a senha atual"
              error={errors.currentPassword?.message}
              {...register("currentPassword")}
            />
            {errors.currentPassword && <p className="text-sm text-red-500 mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
              Nova Senha
            </label>

            <PasswordInput
              id="new-password"
              placeholder="Agora, informe a sua nova senha"
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />
            {errors.newPassword && <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
              Confirmar Nova Senha
            </label>

            <PasswordInput
              id="confirm-password"
              placeholder="Confirme sua nova senha"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? <SpinnerGapIcon className="size-6 animate-spin" /> : "Atualizar senha"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}