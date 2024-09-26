import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import {
  // cacheGetProducts,
  getProducts,
} from "../_data-access/product/get-product";
import CreateProductButton from "./_components/create-product-button";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <CreateProductButton />
      </div>

      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
};

export default ProductsPage;
