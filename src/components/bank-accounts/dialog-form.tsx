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
import { BankAccountForm } from "./form";

export function DialogBankAccountForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[100%]" onClick={() => setOpen(true)}>
          New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bank account</DialogTitle>
          <DialogDescription>Save a bank account.</DialogDescription>
        </DialogHeader>
        <BankAccountForm onFinish={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
