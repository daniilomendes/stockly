"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { SalesTableDropdownMenu } from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-product";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumn extends SaleDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
  {
    header: "Produtos",
    accessorKey: "productNames",
  },
  {
    header: "Quantidade de produtos",
    accessorKey: "totalProducts",
  },
  {
    header: "Valor total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => (
      <SalesTableDropdownMenu
        sale={sale}
        products={sale.products}
        productOptions={sale.productOptions}
      />
    ),
  },
];