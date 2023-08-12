import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
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
  const { data: sessionData } = useSession();
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
                // if (c.children) {
                //   return (
                //     <MenubarSub key={c.name}>
                //       <MenubarSubTrigger>{c.name}</MenubarSubTrigger>
                //       <MenubarSubContent>
                //         {c.children.map((ch) => (
                //           <Link href={ch.path} key={ch.name}>
                //             <MenubarItem>{ch.name}</MenubarItem>
                //           </Link>
                //         ))}
                //       </MenubarSubContent>
                //     </MenubarSub>
                //   );
                // }
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

      <MenubarMenu>
        <MenubarTrigger>Profile</MenubarTrigger>
        <MenubarContent>
          {sessionData && <MenubarItem>{sessionData.user?.name}</MenubarItem>}
          <MenubarSeparator />
          <MenubarItem
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
