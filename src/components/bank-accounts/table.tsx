"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import { api } from "~/utils/api";
export default function TableBankAccounts() {
  const bankAccounts = api.bankAccount.getAll.useQuery();
  const listBankAccounts = bankAccounts?.data ?? [];

  return (
    <>
      <DataTable columns={columns} data={listBankAccounts} pagination />
    </>
  );
}
