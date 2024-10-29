import { z } from "zod";

export const schemaCreateSaleAction = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSaleAction = z.infer<typeof schemaCreateSaleAction>;
