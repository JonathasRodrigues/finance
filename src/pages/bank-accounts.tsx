"use client";

import { DialogBankAccountForm } from "~/components/bank-accounts/dialog-form";
import TableBankAccounts from "../components/bank-accounts/table";

export default function BankAccountPage() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-end-7">
        <DialogBankAccountForm />
      </div>
      <div className="col-start-1 col-end-7">
        <TableBankAccounts />
      </div>
    </div>
  );
}
