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
import { SingleExpenseForm } from "./forms/single";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { InstallmentExpenseForm } from "./forms/installment";

export function DialogExpenseForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[100%]">New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Expense</DialogTitle>
          <DialogDescription>Save you expense.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="installment">Installment</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <SingleExpenseForm onFinish={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="installment">
            <InstallmentExpenseForm onFinish={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
