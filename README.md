
# 📚 SchoolSystem API

A complete RESTful API for managing students, subjects, and grades in a school environment.

## ⚙️ Tech Stack

This project uses the following technologies:

- **Node.js** – JavaScript runtime environment.
- **Express.js** – Web framework for building the API.
- **Sequelize** – ORM for interacting with a PostgreSQL database.
- **PostgreSQL** – Relational database for persistent data storage.
- **Docker** – Containerization for easy deployment and setup (optional).

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/cauasturaro/students-api-crud-node.git
cd SchoolSystem
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your database

Create a `.env` file in the root directory:

```env
DB_HOST=localhost (postgres_db se utilizando docker)
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=schoolsystem
DB_PORT=5432
```

### 4. Initialize the container (if using docker) or the database

```bash
docker-compose up --build
```

> Alternatively, if using Docker, run:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5. Start the server (if not using docker)

```bash
npm run dev
```

The API will be running at:
**[http://localhost:8080/api/](http://localhost:8080/api/)**

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
