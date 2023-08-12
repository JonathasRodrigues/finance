import useAppContext from "~/components/app-provider";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/utils/api";
import { currencyFormat } from "~/utils/formatter";

export default function IncomeCard() {
  const { getStartDate, getEndDate } = useAppContext();

  const totalIncomes = api.income.getTotalValue.useQuery({
    startDate: getStartDate(),
    endDate: getEndDate(),
  });

  const incomeValue = totalIncomes.data?._sum?.value ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incomes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {currencyFormat(incomeValue)}
        </div>
      </CardContent>
    </Card>
  );
}
