import Head from "next/head";
import Menu from "~/components/menu";
import { ThemeProvider } from "./theme-provider";
import { ThemeMode } from "./theme-mode";
import { AppContext } from "./app-provider";
import { useCallback, useState } from "react";
import { getMonth, getYear } from "date-fns";
import AuthButton from "./auth-button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentMonth = getMonth(new Date()).toString();
  const currentYear = getYear(new Date()).toString();
  const [month, setMonth] = useState<string>(currentMonth);
  const [year, setYear] = useState<string>(currentYear);

  const getStartDate = useCallback(() => {
    const m = month === "all" ? 0 : Number(month);
    const y = year === "all" ? 1900 : Number(year);
    return new Date(y, m, 1);
  }, [month, year]);

  const getEndDate = useCallback(() => {
    const m = month === "all" ? 11 : Number(month);
    const y = year === "all" ? 2100 : Number(year);
    return new Date(y, m, 31);
  }, [month, year]);

  return (
    <>
      <Head>
        <title>Finance</title>
        <meta name="description" content="finance app by @jonathasrodrigues" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContext.Provider
          value={{ month, year, setMonth, setYear, getStartDate, getEndDate }}
        >
          <main className="flex min-h-screen flex-col items-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-16 py-16">
              <div className="flex gap-4">
                <Menu />
                <ThemeMode />
                <AuthButton />
              </div>
              <div className="flex max-w-[840px] items-center justify-center">
                {children}
              </div>
            </div>
          </main>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
}
