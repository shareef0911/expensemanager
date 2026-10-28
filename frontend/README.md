# Expense Manager UI

React + Vite + React Router + Axios frontend for the Spring Boot `expensemanager` backend.

## Run

1. Start the backend (port 9999).
2. `npm install`
3. `npm run dev` and open http://localhost:5173

Dev requests to `/api` are proxied to `localhost:9999` (see `vite.config.js`), so CORS is not needed locally.
For a separately hosted build, copy `.env.example` to `.env` and enable CORS on the backend.

## Structure

```
src/
  api/         one file per backend controller + shared axios client (error handling lives here)
  hooks/       useAsync (load), useAction (mutate), useForm (form + validation), useWorkspace (events + users)
  utils/       format.js (currency/date), expenses.js (totals, filters, balances), constants.js
  components/
    ui/        Modal, Form (Field, FormShell), States (Loading/Error/Empty/Async), PageHeader, Stat
    layout/    Layout (sidebar + outlet)
    expense/   ExpenseForm, ExpenseTable, CategoryBars
    event/     EventForm, UserForm, MembersPanel
  pages/       Dashboard, Events, EventDetail, Expenses, Users
  styles/      index.css (design tokens at the top, light and dark)
```

## Extending

- New endpoint: add a function in the matching `api/*Api.js`.
- New screen: add a page in `pages/` and one `<Route>` in `App.jsx`.
- Currency: change `CURRENCY` in `utils/format.js`. Categories: edit `utils/constants.js`.
