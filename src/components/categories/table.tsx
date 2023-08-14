"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import { api } from "~/utils/api";
export default function TableCategories() {
  const categories = api.expenseCategory.getAll.useQuery();

  const listCategories = categories?.data ?? [];
  return (
    <>
      <DataTable columns={columns} data={listCategories} pagination />
    </>
  );
}
