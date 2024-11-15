import { z } from "zod";

export const schemaUpsertSaleAction = z.object({
  id: z.string().uuid().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type UpsertSaleAction = z.infer<typeof schemaUpsertSaleAction>;
