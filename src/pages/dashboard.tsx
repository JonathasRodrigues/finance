import BalanceCard from "~/components/dashboard/balance-card";
import ExpensesByCategory from "~/components/dashboard/expense-by-category";
import ExpensesByPaymentMethod from "~/components/dashboard/expense-by-payment-method";
import ExpensesByType from "~/components/dashboard/expense-by-type";
import ExpenseCard from "~/components/dashboard/expense-card";
import IncomeCard from "~/components/dashboard/income-card";
import InstallmentCard from "~/components/dashboard/installment-card";
import RecentExpenses from "~/components/dashboard/recent-expenses";
import PageContent from "~/components/page-content";
export default function Dashboard() {
  return (
    <PageContent
      title="Dashboard"
      subtitle="Manage your finance life."
      periodFilter
    >
      <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ExpenseCard />
          <IncomeCard />
          <InstallmentCard />
          <BalanceCard />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <ExpensesByType />
          <ExpensesByPaymentMethod />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          <RecentExpenses />
          <ExpensesByCategory />
        </div>
      </>
    </PageContent>
  );
}

Dashboard.auth = true;
