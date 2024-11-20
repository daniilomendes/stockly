"use server";

import { db } from "@/app/_lib/prisma";
import { actionClient } from "@/app/_lib/safe-action";
import { upsertProductSchema } from "@/app/_schemas/upsert-product-schema";
import { revalidatePath } from "next/cache";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, ...data } }) => {
    upsertProductSchema.parse(data);

    await db.product.upsert({
      where: {
        id: id ?? "",
      },
      update: data,
      create: data,
    });

    revalidatePath("/products");
    revalidatePath("/");
  });
