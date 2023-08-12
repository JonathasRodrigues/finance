import ExpenseCard from "~/components/dashboard/expense-card";
import IncomeCard from "~/components/dashboard/income-card";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ExpenseCard />
      <IncomeCard />
    </div>
  );
}
