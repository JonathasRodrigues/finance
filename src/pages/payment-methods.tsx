"use client";

import PageContent from "~/components/page-content";
import { DialogPaymentMethodForm } from "~/components/payment-methods/dialog-form";
import TablePaymentMethods from "~/components/payment-methods/table";

export default function PaymentMethods() {
  return (
    <PageContent
      title="Payment Methods"
      subtitle="List of your payment methods (credit card, pix, etc)"
      headerRight={<DialogPaymentMethodForm />}
    >
      <TablePaymentMethods />
    </PageContent>
  );
}

PaymentMethods.auth = true;
