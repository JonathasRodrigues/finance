"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import { api } from "~/utils/api";
export default function TablePaymentMethods() {
  const paymentMethods = api.paymentMethod.getAll.useQuery();

  const listPaymentMethods = paymentMethods?.data ?? [];

  return (
    <>
      <DataTable columns={columns} data={listPaymentMethods} pagination />
    </>
  );
}
