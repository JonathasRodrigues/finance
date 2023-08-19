"use client";

import { DialogIncomeForm } from "~/components/incomes/dialog-form";
import TableIncomes from "~/components/incomes/table";
import PageContent from "~/components/page-content";

export default function Incomes() {
  return (
    <PageContent
      title="Incomes"
      subtitle="List of your incomes."
      periodFilter
      headerRight={<DialogIncomeForm />}
    >
      <TableIncomes />
    </PageContent>
  );
}

Incomes.auth = true;
