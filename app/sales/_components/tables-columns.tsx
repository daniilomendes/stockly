"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { SalesTableDropdownMenu } from "./table-dropdown-menu";

export const saleTableColumns: ColumnDef<SaleDto>[] = [
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
      <SalesTableDropdownMenu sale={sale} />
    ),
  },
];
