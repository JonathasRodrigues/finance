import { api } from "~/utils/api";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { currencyFormat } from "~/utils/formatter";
import useAppContext from "../app-provider";

export default function ExpensesByPaymentMethod() {
  const { getStartDate, getEndDate } = useAppContext();

  const expenses = api.expense.getTotalByPaymentMethod.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const listExpenses = expenses.data ?? [];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Expenses by payment method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listExpenses.map((expense) => (
            <div key={expense.paymentMethodId} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {expense.paymentMethodId}
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
