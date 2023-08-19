import { api } from "~/utils/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { currencyFormat } from "~/utils/formatter";
import useAppContext from "../app-provider";

export default function ExpensesByCategory() {
  const { getStartDate, getEndDate } = useAppContext();

  const expenses = api.expense.getTotalByCategory.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const listExpenses = expenses.data ?? [];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Expenses by category</CardTitle>
        <CardDescription>You expenses by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listExpenses.map((expense) => (
            <div key={expense.categoryId} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {expense.categoryId}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {currencyFormat(expense?._sum?.value ?? 0)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
