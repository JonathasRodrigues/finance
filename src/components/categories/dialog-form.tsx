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
import { CategoryForm } from "./form";

export function DialogCategoryForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[100%]" onClick={() => setOpen(true)}>
          New category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
          <DialogDescription>Save an expense category.</DialogDescription>
        </DialogHeader>
        <CategoryForm onFinish={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
