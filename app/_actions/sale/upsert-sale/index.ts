"use server";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { schemaUpsertSaleAction } from "@/app/_schemas/upsert-sale-action";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(schemaUpsertSaleAction)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdate = Boolean(id);

    await db.$transaction(async (trx) => {
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProducts: true },
        });
        await trx.sale.delete({
          where: { id },
        });

        if (!existingSale) return;

        for (const product of existingSale?.saleProducts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }

      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
          returnValidationErrors(schemaUpsertSaleAction, {
            _errors: ["Este produto não existe!"],
          });
        }

        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(schemaUpsertSaleAction, {
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
    revalidatePath("/sales");
    revalidatePath("/");
  });
