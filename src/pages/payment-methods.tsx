"use client";

import { DialogPaymentMethodForm } from "~/components/payment-methods/dialog-form";
import TablePaymentMethods from "~/components/payment-methods/table";

export default function PaymentMethodPage() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-end-7">
        <DialogPaymentMethodForm />
      </div>
      <div className="col-start-1 col-end-7">
        <TablePaymentMethods />
      </div>
    </div>
  );
}
