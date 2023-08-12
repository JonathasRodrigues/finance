"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import { api } from "~/utils/api";
export default function TableCategories() {
  const categories = api.expenseCategory.getAll.useQuery();

  const listCategories = categories?.data ?? [];
  return (
    <>
      <DataTable columns={columns} data={listCategories} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total of {listCategories.length} expense(s)
        </div>
      </div>
    </>
  );
}
