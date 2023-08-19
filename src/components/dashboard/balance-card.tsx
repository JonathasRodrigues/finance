import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/utils/api";
import { currencyFormat } from "~/utils/formatter";
import { cn } from "~/lib/utils";
import useAppContext from "~/components/app-provider";

export default function BalanceCard() {
  const { getStartDate, getEndDate } = useAppContext();

  const totalExpenses = api.expense.getTotalValue.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const totalIncomes = api.income.getTotalValue.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const expenseValue = totalExpenses.data?._sum?.value ?? 0;
  const incomeValue = totalIncomes.data?._sum?.value ?? 0;
  const balance = incomeValue - expenseValue;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Balance</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "text-2xl font-bold",
            balance > 0 ? "text-green-600" : "text-red-600"
          )}
        >
          {currencyFormat(balance)}
        </div>
        <p className="text-xs text-muted-foreground">incomes - expenses</p>
      </CardContent>
    </Card>
  );
}
