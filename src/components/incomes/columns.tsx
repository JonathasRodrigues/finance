"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type IncomeType } from "~/schemas/income";
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

export const columns: ColumnDef<IncomeType>[] = [
  {
    accessorKey: "name",
    header: "Income",
  },
  {
    accessorKey: "payDay",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pay day" />
    ),
    cell: ({ row }) => <div>{dateFormat(row.original.payDay)}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "bankAccount.name",
    header: "Bank account",
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
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
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
  },
];
