"use client";

import { DialogExpenseForm } from "~/components/expenses/dialog-form";
import TableExpenses from "~/components/expenses/table";
import PageContent from "~/components/page-content";

export default function Expenses() {
  return (
    <PageContent
      title="Expenses"
      subtitle="List of your expenses."
      periodFilter
      headerRight={<DialogExpenseForm />}
    >
      <TableExpenses />
    </PageContent>
  );
}

Expenses.auth = true;
