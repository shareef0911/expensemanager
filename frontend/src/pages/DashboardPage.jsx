import CategoryBars from '../components/expense/CategoryBars';
import ExpenseTable from '../components/expense/ExpenseTable';
import PageHeader from '../components/ui/PageHeader';
import Stat from '../components/ui/Stat';
import { Async } from '../components/ui/States';
import { useWorkspace } from '../hooks/useWorkspace';
import { sortByDate, sum, totalsByCategory } from '../utils/expenses';
import { formatMoney } from '../utils/format';

export default function DashboardPage() {
  const state = useWorkspace();

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Spending across all your events" />
      <Async state={state}>
        {({ events, users, expenses }) => {
          const total = sum(expenses);
          return (
            <>
              <div className="grid stats">
                <Stat label="Total spent" value={formatMoney(total)} />
                <Stat label="Events" value={events.length} />
                <Stat label="People" value={users.length} />
                <Stat label="Expenses" value={expenses.length} />
              </div>
              <div className="grid two">
                <section className="card">
                  <h2>By category</h2>
                  {expenses.length ? <CategoryBars items={totalsByCategory(expenses)} total={total} /> : <p className="muted">Nothing spent yet.</p>}
                </section>
                <section className="card">
                  <h2>Recent expenses</h2>
                  <ExpenseTable expenses={sortByDate(expenses).slice(0, 5)} showEvent />
                </section>
              </div>
            </>
          );
        }}
      </Async>
    </>
  );
}
