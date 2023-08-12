import useAppContext from "~/components/app-provider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/utils/api";
import { currencyFormat } from "~/utils/formatter";

export default function ExpenseCard() {
  const { getStartDate, getEndDate } = useAppContext();

  const totalExpenses = api.expense.getTotalValue.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const expenseValue = totalExpenses.data?._sum?.value ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {currencyFormat(expenseValue)}
        </div>
      </CardContent>
    </Card>
  );
}
