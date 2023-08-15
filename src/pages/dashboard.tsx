import ExpenseCard from "~/components/dashboard/expense-card";
import IncomeCard from "~/components/dashboard/income-card";

export default function Dashboard() {
  return (
    <div className="grid gap-4">
      <ExpenseCard />
      <IncomeCard />
    </div>
  );
}

Dashboard.auth = true;
