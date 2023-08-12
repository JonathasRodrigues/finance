"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import { api } from "~/utils/api";
import useAppContext from "~/components/app-provider";
export default function TableIncomes() {
  const { getStartDate, getEndDate } = useAppContext();

  const incomes = api.income.getAll.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const listIncomes = incomes?.data ?? [];

  return (
    <>
      <DataTable
        columns={columns}
        data={listIncomes}
        loading={incomes.isLoading}
        filter={{ searchFieldName: "name" }}
      />
    </>
  );
}
