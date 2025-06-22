import { z } from "zod"

export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Senha atual é obrigatória" }),
    newPassword: z
      .string()
      .min(6, { message: "Nova senha deve ter pelo menos 6 caracteres" })
      .regex(/[a-zA-Z]/, { message: "Nova senha deve conter pelo menos uma letra" })
      .regex(/[0-9]/, { message: "Nova senha deve conter pelo menos um número" })
      .regex(/[^a-zA-Z0-9]/, { message: "Nova senha deve conter pelo menos um caractere especial" }),
    confirmPassword: z.string().min(1, { message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export type PasswordUpdateFormData = z.infer<typeof passwordUpdateSchema>
