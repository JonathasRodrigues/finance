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
  bankAccountSchema,
  type BankAccountType,
} from "~/schemas/bank-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import { type FormType } from "../interfaces";
import { InputCurrency } from "../ui/input-currency";

export function BankAccountForm({
  defaultValues,
  onFinish,
}: FormType<BankAccountType>) {
  const utils = api.useContext();
  const form = useForm<BankAccountType>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues,
  });
  const { mutate } = api.bankAccount.create.useMutation({
    onSuccess: (data) => {
      const currentList = utils.bankAccount.getAll.getData();
      utils.bankAccount.getAll.setData(undefined, [
        ...(currentList ?? []),
        ...[data],
      ]);
      form.reset();
      toast({ title: "Success", description: "Bank account saved" });
      onFinish();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occured when creating an expense category",
      });
    },
  });

  function onSubmit(values: BankAccountType) {
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
              <FormLabel> Name</FormLabel>
              <FormControl>
                <Input placeholder="My bank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <InputCurrency {...field} />
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
