import { z } from "zod";

export const formSchema = z.object({
  productId: z.string().uuid({ message: "O produto é obrigatório." }),
  quantity: z.coerce
    .number({
      required_error: "A quantidade é obrigatório",
      invalid_type_error: "O valor deve ser um número",
    })
    .int()
    .positive({ message: "O valor deve ser maior que 0." }),
});

export type FormSchema = z.infer<typeof formSchema>;
