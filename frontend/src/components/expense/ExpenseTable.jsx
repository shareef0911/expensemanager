import { Link } from 'react-router-dom';
import { formatDate, formatMoney } from '../../utils/format';
import { EmptyState } from '../ui/States';

export default function ExpenseTable({ expenses, showEvent = false, onEdit, onDelete }) {
  if (!expenses.length) return <EmptyState title="No expenses yet" hint="Added expenses will show up here." />;
  const hasActions = onEdit || onDelete;

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th><th>Description</th>{showEvent && <th>Event</th>}
            <th>Paid by</th><th className="right">Amount</th>{hasActions && <th />}
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{formatDate(e.expenseDate)}</td>
              <td>{e.description} <span className="chip">{e.category}</span></td>
              {showEvent && <td><Link to={`/events/${e.eventId}`}>{e.eventName}</Link></td>}
              <td>{e.paidBy?.name}</td>
              <td className="right num">{formatMoney(e.amount)}</td>
              {hasActions && (
                <td className="right nowrap">
                  {onEdit && <button className="btn btn--ghost" onClick={() => onEdit(e)}>Edit</button>}
                  {onDelete && <button className="btn btn--ghost btn--danger" onClick={() => onDelete(e)}>Delete</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
