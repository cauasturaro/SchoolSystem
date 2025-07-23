
# 📚 SchoolSystem API

A complete RESTful API for managing students, subjects, and grades in a school environment.

## ⚙️ Tech Stack

This project uses the following technologies:

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for building the API.
- **Sequelize** – ORM for interacting with a PostgreSQL database.
- **PostgreSQL** – Relational database for persistent data storage.
- **Docker** – Containerization for easy deployment and setup (optional).
- **Angular** - SPA (Single Page Aplication) modern framework for the frontend

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/cauasturaro/SchoolSystem.git
cd SchoolSystem
````

## 🐳 Option A: Run the project using Docker (recommended)

> Requires: Docker and Docker Compose installed

### 1. Create environment file

Create a `.env` file in the project root with:

```env
DB_HOST=postgres_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=schoolsystem
```

> ⚠️ Make sure to use `postgres_db` as the host (it's the name of the container).

### 2. Start all services

```bash
docker-compose up --build
```

* Backend: [http://localhost:8080/api/](http://localhost:8080/api/)
* Frontend: [http://localhost/](http://localhost/)

> The PostgreSQL container will be initialized automatically.

## 🧪 Option B: Run locally without Docker

> Requires: Node.js, PostgreSQL and Angular CLI installed

### 1. Set up PostgreSQL

Create a local PostgreSQL database manually, then add a `.env` file in the root with your local config:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=schoolsystem
DB_PORT=5432
```

### 2. Start the backend

```bash
cd backend
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm run dev
```

Backend will be running at: **[http://localhost:8080/api/](http://localhost:8080/api/)**

### 3. Start the frontend

```bash
cd ../frontend
npm install
ng serve
```

Frontend will be running at: **[http://localhost:4200/](http://localhost:4200/)**

---
## 📡 API Endpoints

### 🧑‍🎓 Students

| Method | Route                         | Description                                |
|--------|-------------------------------|--------------------------------------------|
| POST   | `/api/students`               | Create a new student                       |
| GET    | `/api/students`               | Get all students                           |
| GET    | `/api/students/:id`           | Get a student by ID                        |
| GET    | `/api/students/:id/grades`    | List all grades for a student              |
| GET    | `/api/students/:id/all`       | Show all related data                      |
| PUT    | `/api/students/:id`           | Update a student by ID                     |
| DELETE | `/api/students/:id`           | Delete a student by ID                     |

---

### 📚 Subjects

| Method | Route                       | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/api/subjects`             | Create a new subject     |
| GET    | `/api/subjects`             | Get all subjects         |
| GET    | `/api/subjects/:id`         | Get a subject by ID      |
| PUT    | `/api/subjects/:id`         | Update a subject by ID   |
| DELETE | `/api/subjects/:id`         | Delete a subject by ID   |

---

### 📝 Grades

| Method | Route                    | Description              |
|--------|--------------------------|--------------------------|
| POST   | `/api/grades`            | Create a new grade       |
| GET    | `/api/grades`            | Get all grades           |
| GET    | `/api/grades/:id`        | Get a grade by ID        |
| PUT    | `/api/grades/:id`        | Update a grade by ID     |
| DELETE | `/api/grades/:id`        | Delete a grade by ID     |

---
