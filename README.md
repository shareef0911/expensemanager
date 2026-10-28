# Expense Manager (full stack)

```
expense-manager/
  backend/    Spring Boot 4 + MySQL API (port 9999)
  frontend/   React + Vite UI (port 5173)
```

## Run

1. Create the MySQL database once: `CREATE DATABASE expensemanager;`
   (credentials are in `backend/src/main/resources/application.properties`).
2. Backend: `cd backend` then `mvnw.cmd spring-boot:run` (Windows) or `./mvnw spring-boot:run`,
   or run `ExpensemanagerApplication` from your IDE.
3. Frontend (second terminal): `cd frontend`, `npm install`, `npm run dev`.
4. Open http://localhost:5173

The frontend proxies `/api` to `localhost:9999`, so no CORS setup is needed in development.

## Backend fixes already applied

- `User.events` is `@JsonIgnore` (stops the infinite Event/User JSON loop).
- `EventController.removeMember` now binds `eventId` and `userId` correctly.
