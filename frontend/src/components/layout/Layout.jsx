import { NavLink, Outlet } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/events', label: 'Events' },
  { to: '/expenses', label: 'Expenses' },
  { to: '/users', label: 'People' },
];

export default function Layout() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">Expense Manager</div>
        <nav>
          {NAV.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>{label}</NavLink>
          ))}
        </nav>
      </aside>
      <main className="main"><Outlet /></main>
    </div>
  );
}
