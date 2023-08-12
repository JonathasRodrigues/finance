"use client";

import { DialogIncomeForm } from "~/components/incomes/dialog-form";
import TableIncomes from "~/components/incomes/table";

export default function Incomes() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-end-7">
        <DialogIncomeForm />
      </div>
      <div className="col-start-1 col-end-7">
        <TableIncomes />
      </div>
    </div>
  );
}
