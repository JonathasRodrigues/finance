"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type ExpenseType } from "~/schemas/expense";
import { currencyFormat, dateFormat } from "~/utils/formatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { DataTableColumnHeader } from "../ui/data-table-column-header";

export const columns: ColumnDef<ExpenseType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expense" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "type.name",
    accessorKey: "type.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id: string, value: string) => {
      return value?.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due date" />
    ),
    cell: ({ row }) => <div>{dateFormat(row.original.dueDate)}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "category.name",
    accessorKey: "category.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id: string, value: string) => {
      return value?.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "paymentMethod.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment method" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "paymentMethod.bankAccount.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bank account" />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "installment",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Installments"
      />
    ),
    cell: ({ row }) => {
      const current: number = row.original.currentInstallment ?? 0;
      const total: number = row.original.totalInstallment ?? 0;
      if (!current && !total)
        return <div className="text-center font-medium">-</div>;
      return (
        <div className="text-center font-medium">{`${current}/${total}`}</div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title="Value"
      />
    ),
    cell: ({ row }) => {
      const balance = row.original.value;
      const formatted = currencyFormat(balance);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableHiding: false,
  },
];
