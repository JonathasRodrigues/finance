/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  expenseCategorySchema,
  type ExpenseCategoryType,
} from "~/schemas/expense-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import { type FormType } from "../interfaces";

export function CategoryForm({
  defaultValues,
  onFinish,
}: FormType<ExpenseCategoryType>) {
  const utils = api.useContext();
  const form = useForm<ExpenseCategoryType>({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues,
  });
  const { mutate } = api.expenseCategory.create.useMutation({
    onSuccess: (data) => {
      const currentList = utils.expenseCategory.getAll.getData();
      utils.expenseCategory.getAll.setData(undefined, [
        ...(currentList ?? []),
        ...[data],
      ]);
      form.reset();
      toast({ title: "Success", description: "Category saved" });
      onFinish();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occured when creating a category",
      });
    },
  });

  function onSubmit(values: ExpenseCategoryType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense category</FormLabel>
              <FormControl>
                <Input placeholder="Food" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
