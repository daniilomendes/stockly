import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
// import { unstable_cache } from "next/cache";

export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};

// export const cacheGetProducts = unstable_cache(getProducts, ["getProducts"], {
//   tags: ["get-products"],
//   revalidate: 10,
// });
