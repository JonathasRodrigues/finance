import { api } from "~/utils/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { currencyFormat, dateFormat } from "~/utils/formatter";

export default function RecentExpenses() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const expenses = api.expense.getLast10.useQuery({
    startDate: firstDay,
    endDate: lastDay,
  });

  const listExpenses = expenses.data ?? [];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>
          You made {listExpenses.length} expenses recently.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center">
              <p className="text-sm font-medium text-muted-foreground">
                {dateFormat(expense.dueDate)}
              </p>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {expense.name}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {currencyFormat(expense.value)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
