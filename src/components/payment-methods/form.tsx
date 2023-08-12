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
  paymentMethodSchema,
  type PaymentMethodType,
} from "~/schemas/payment-method";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import { type FormType } from "../interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function PaymentMethodForm({
  defaultValues,
  onFinish,
}: FormType<PaymentMethodType>) {
  const utils = api.useContext();
  const bankAccounts = api.bankAccount.getAll.useQuery();
  const form = useForm<PaymentMethodType>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues,
  });
  const { mutate } = api.paymentMethod.create.useMutation({
    onSuccess: (data) => {
      const currentList = utils.paymentMethod.getAll.getData();
      utils.paymentMethod.getAll.setData(undefined, [
        ...(currentList ?? []),
        ...[data],
      ]);
      form.reset();
      toast({ title: "Success", description: "Payment method saved" });
      onFinish();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occured when creating a payment method",
      });
    },
  });

  function onSubmit(values: PaymentMethodType) {
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
          name="bankAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank account</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a a bank account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(bankAccounts.data ?? []).map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
