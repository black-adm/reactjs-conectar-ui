import { z } from "zod";

export const updateUserDataSchema = z.object({
  name: z.string().min(6, {
    message: "O nome completo deve possuir no minímo 6 caracteres."
  }),
  email: z.string().email({
    message: "Informe um endereço de e-mail válido.",
  }),
  role: z.enum(["user", "admin"])
});