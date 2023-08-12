"use client";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "./columns";
import { api } from "~/utils/api";
import useAppContext from "~/components/app-provider";

export default function TableExpenses() {
  const { getStartDate, getEndDate } = useAppContext();

  const expenses = api.expense.getAll.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const categories = api.expenseCategory.getAll.useQuery();

  const categoriesAsOptions = (categories?.data ?? []).map((c) => ({
    label: c.name,
    value: c.name,
  }));

  const types = api.expenseType.getAll.useQuery();

  const typesAsOptions = (types?.data ?? []).map((t) => ({
    label: t.name,
    value: t.name,
  }));

  const listExpenses = expenses?.data ?? [];
  return (
    <>
      <DataTable
        columns={columns}
        data={listExpenses}
        loading={expenses.isLoading}
        pagination
        filter={{
          select: [
            {
              id: "category.name",
              title: "Category",
              options: categoriesAsOptions,
            },
            {
              id: "type.name",
              title: "Type",
              options: typesAsOptions,
            },
          ],
          searchFieldName: "name",
        }}
      />
    </>
  );
}
