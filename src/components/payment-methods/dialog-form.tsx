"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useState } from "react";
import { PaymentMethodForm } from "./form";

export function DialogPaymentMethodForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[100%]" onClick={() => setOpen(true)}>
          New payment method
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment method</DialogTitle>
          <DialogDescription>Save a payment method.</DialogDescription>
        </DialogHeader>
        <PaymentMethodForm onFinish={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
