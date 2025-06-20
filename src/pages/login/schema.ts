import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Informe um endereço de e-mail válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve possuir no minímo 6 caracteres."
  })
})