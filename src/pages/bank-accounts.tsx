"use client";

import { DialogBankAccountForm } from "~/components/bank-accounts/dialog-form";
import TableBankAccounts from "../components/bank-accounts/table";
import PageContent from "~/components/page-content";

export default function BankAccounts() {
  return (
    <PageContent
      title="Bank accounts"
      subtitle="List of your bank accounts."
      headerRight={<DialogBankAccountForm />}
    >
      <TableBankAccounts />
    </PageContent>
  );
}

BankAccounts.auth = true;
