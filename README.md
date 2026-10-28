Expense Manager

A full-stack app for tracking and splitting shared expenses across events such as trips and parties. Create events, add members, record who paid for what, and see who owes or gets back money.

Backend: Spring Boot, Spring Data JPA, MySQL Frontend: React (Vite), React Router, Axios

Features
Create events with a name and location
Add and remove people, and add them to events as members
Record, edit and delete expenses with category, date, amount and who paid
Per-event balances using an equal split among members
Dashboard with total spend, spending by category and recent expenses
Expenses page with search and filters by event and category
Validation on both sides, with clear error messages
Light and dark theme, responsive layout
Tech stack
Layer	Technology
Backend	Java 17+, Spring Boot, Spring Data JPA (Hibernate), Bean Validation, Lombok
Database	MySQL
API docs	springdoc-openapi (Swagger UI)
Frontend	React 18, Vite, React Router, Axios, plain CSS
Project structure
expense-manager/
├── backend/                     Spring Boot API (port 9999)
│   └── src/main/java/com/baji/expensemanager/
│       ├── controller/          REST controllers
│       ├── service/             Service interfaces
│       ├── serviceimpl/         Service implementations
│       ├── repository/          Spring Data JPA repositories
│       ├── entity/              JPA entities (User, Event, Expense)
│       ├── dto/                 Request records with validation
│       └── exceptions/          Custom exceptions + global handler
└── frontend/                    React UI (port 5173)
    └── src/
        ├── api/                 Axios client + one file per backend controller
        ├── hooks/               useAsync, useAction, useForm, useWorkspace
        ├── utils/               Formatting, calculations, constants
        ├── components/          ui, layout, expense, event
        ├── pages/               Dashboard, Events, EventDetail, Expenses, Users
        └── styles/              Design tokens and global CSS
Getting started
Prerequisites
Java 17 or newer
Node.js 18 or newer
MySQL running locally
1. Create the database
sql
CREATE DATABASE expensemanager;

The default credentials are in backend/src/main/resources/application.properties (root / root). Change them to match your MySQL setup. Tables are created automatically on first run.

2. Run the backend
bash
cd backend
./mvnw spring-boot:run        # Windows: .\mvnw.cmd spring-boot:run

The API runs at http://localhost:9999. Check it with http://localhost:9999/api/events, which should return [].

3. Run the frontend
bash
cd frontend
npm install
npm run dev

Open http://localhost:5173. In development, requests to /api are proxied to the backend, so no CORS setup is needed.

API overview
Method	Endpoint	Description
POST	/api/users/createUser	Create a user
GET	/api/users/getUsers	List users
GET	/api/users/getUser/{id}	Get a user
DELETE	/api/users/deleteUser/{id}	Delete a user
POST	/api/events	Create an event
GET	/api/events	List events (with members and expenses)
GET	/api/events/{id}	Get an event
POST	/api/events/{eventId}/members/{userId}	Add a member
DELETE	/api/events/{eventId}/members/{userId}	Remove a member
POST	/api/expense	Create an expense
GET	/api/expense	List expenses
GET	/api/expense/{id}	Get an expense
GET	/api/expense/event/{eventId}	List expenses of an event
PUT	/api/expense/{id}	Update an expense
DELETE	/api/expense/{id}	Delete an expense

Errors are returned as JSON with timestamp, status, error, message and path.

How to use
Go to People and add the people who share expenses.
Go to Events and create an event.
Open the event and add members.
Click Add expense and choose who paid.
Check Members and balances to see who owes or gets back money.
Configuration
Currency: change CURRENCY in frontend/src/utils/format.js.
Expense categories: edit frontend/src/utils/constants.js.
API URL for a separately hosted frontend: copy frontend/.env.example to frontend/.env and set VITE_API_BASE_URL. Enable CORS in the backend when you do this.
Known limitations
No authentication yet.
Balances assume an equal split among event members.
Deleting a user who has paid for expenses or belongs to an event is blocked by database constraints.
Roadmap
Login with Spring Security and JWT
Unequal splits and settle-up suggestions
Edit and delete events
Export expenses to CSV

Author

Shaik Baji Shareef · GitHub
