"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import { api } from "~/utils/api";
export default function TablePaymentMethods() {
  const paymentMethods = api.paymentMethod.getAll.useQuery();

  const listPaymentMethods = paymentMethods?.data ?? [];

  return (
    <>
      <DataTable columns={columns} data={listPaymentMethods} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total of {listPaymentMethods.length} payment method(s)
        </div>
      </div>
    </>
  );
}
