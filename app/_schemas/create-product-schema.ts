import { z } from "zod";

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome do produto é obrigatório!" }),
  price: z
    .number({
      required_error: "O número é obrigatório",
      invalid_type_error: "O valor deve ser um número",
    })
    .nonnegative("O número deve ser maior ou igual a 0"),
  stock: z.coerce
    .number({
      required_error: "O número é obrigatório",
      invalid_type_error: "O valor deve ser um número",
    })
    .int()
    .nonnegative("O número deve ser maior ou igual a 0"),
});
