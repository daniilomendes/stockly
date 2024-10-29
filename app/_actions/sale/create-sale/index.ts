"use server";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { schemaCreateSaleAction } from "@/app/_schemas/create-sale-action";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(schemaCreateSaleAction)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
          returnValidationErrors(schemaCreateSaleAction, {
            _errors: ["Este produto não existe!"],
          });
        }

        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(schemaCreateSaleAction, {
            _errors: ["Não possuímos esse produto em estoque!"],
          });
        }

        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });

        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/products");
  });
