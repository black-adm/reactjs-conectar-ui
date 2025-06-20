import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(6, {
    message: "O nome completo deve possuir no minímo 6 caracteres."
  }),
  email: z.string().email({
    message: "Informe um endereço de e-mail válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve possuir no minímo 6 caracteres."
  })
})