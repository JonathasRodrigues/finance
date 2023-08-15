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
import { incomeSchema, type IncomeType } from "~/schemas/income";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import { type FormType } from "~/components/interfaces";
import { InputCurrency } from "../ui/input-currency";

interface FormValuesType {
  name: string | undefined;
  value: number | undefined;
  payDay: Date;
  bankAccountId: string;
}

export function IncomeForm({
  defaultValues,
  onFinish,
}: FormType<FormValuesType>) {
  const utils = api.useContext();
  const bankAccounts = api.bankAccount.getAll.useQuery();
  const form = useForm<IncomeType>({
    resolver: zodResolver(incomeSchema),
    defaultValues,
  });
  const { mutate } = api.income.create.useMutation({
    onSuccess: async () => {
      await utils.income.getAll.refetch();
      form.reset();
      toast({ title: "Success", description: "Income saved" });
      onFinish();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occured when creating an income",
      });
    },
  });

  function onSubmit(values: IncomeType) {
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
              <FormLabel>Income</FormLabel>
              <FormControl>
                <Input placeholder="Salary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <InputCurrency {...field} />
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
              <FormLabel>Bank Account</FormLabel>
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
        <FormField
          control={form.control}
          name="payDay"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Payday</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    required
                  />
                </PopoverContent>
              </Popover>
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
