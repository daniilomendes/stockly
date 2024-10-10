"use server";

import { db } from "@/app/_lib/prisma";
import {
  createSaleAction,
  CreateSaleAction,
} from "@/app/_schemas/create-sale-action";
import { revalidatePath } from "next/cache";

export const createSale = async (data: CreateSaleAction) => {
  createSaleAction.parse(data);

  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });

  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });

    if (!productFromDb) throw new Error("Este produto não existe!");

    const productIsOutOfStock = product.quantity > productFromDb.stock;
    if (productIsOutOfStock)
      throw new Error("Não possuímos esse produto em estoque!");

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });

    await db.product.update({
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

  revalidatePath("/products");
};
