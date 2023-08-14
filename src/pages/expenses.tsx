"use client";

import { DialogExpenseForm } from "~/components/expenses/dialog-form";
import TableExpenses from "~/components/expenses/table";

export default function Expenses() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-end-7">
        <DialogExpenseForm />
      </div>
      <div className="col-start-1 col-end-7">
        <TableExpenses />
      </div>
    </div>
  );
}

Expenses.auth = true;
