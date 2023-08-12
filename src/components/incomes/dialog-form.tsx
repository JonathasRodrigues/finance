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
import { IncomeForm } from "./form";

export function DialogIncomeForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[100%]">New income</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Income</DialogTitle>
          <DialogDescription>Save you income.</DialogDescription>
        </DialogHeader>
        <IncomeForm onFinish={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
