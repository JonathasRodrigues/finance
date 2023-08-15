import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "~/components/ui/menubar";

import React from "react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Finance",
    children: [
      {
        name: "Expenses",
        path: "/expenses",
      },
      {
        name: "Incomes",
        path: "/incomes",
      },
    ],
  },
  {
    name: "Settings",
    children: [
      {
        name: "Bank accounts",
        path: "/bank-accounts",
      },

      {
        name: "Categories",
        path: "/categories",
      },

      {
        name: "Payment methods",
        path: "/payment-methods",
      },
    ],
  },
];

export default function Menu() {
  return (
    <Menubar>
      {menuItems.map((i) => {
        if (!i.children && i.path) {
          return (
            <MenubarMenu key={i.name}>
              <Link href={i.path}>
                <MenubarTrigger>{i.name}</MenubarTrigger>
              </Link>
            </MenubarMenu>
          );
        }

        return (
          <MenubarMenu key={i.name}>
            <MenubarTrigger>{i.name}</MenubarTrigger>
            <MenubarContent>
              {i.children?.map((c) => {
                return (
                  <Link href={c.path} key={c.name}>
                    <MenubarItem>{c.name}</MenubarItem>
                  </Link>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}
