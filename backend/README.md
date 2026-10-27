# Resume Builder Backend (Spring Boot + MySQL + JWT)

## Features
- **Spring Boot 3.3.4** REST API
- **Spring Data JPA & Hibernate** ORM (auto-generates tables in MySQL)
- **Spring Security & JJWT** for token-based authentication
- **MySQL Database Integration** (works with MySQL Server and MySQL Workbench)
- **Automatic Data Seeding**: Automatically seeds standard resume templates on initial startup

---

## 1. MySQL Workbench & Database Setup

1. Open **MySQL Workbench** and connect to your local MySQL server (port 3306).
2. Open `src/main/resources/application.properties` and verify your MySQL username and password:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/resumedb?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=root
   ```
   > **Note:** If your MySQL password is not `root`, change `spring.datasource.password` to match your MySQL password.

3. Hibernate will automatically create the `resumedb` database and all required tables (`users`, `resumes`, `educations`, `experiences`, `resume_references`, `templates`, `resume_skills`, `resume_languages`).
4. (Optional) You can also open and run the provided `schema.sql` file directly in MySQL Workbench if you prefer to inspect or create the schema manually.

---

## 2. Running the Backend

From the `backend/` directory, run:

```bash
mvn spring-boot:run
```

Or run the generated JAR file:
```bash
java -jar target/resume-builder-backend-1.0.0.jar
```

The backend server will start on `http://localhost:8080`.

---

## 3. Running the Frontend

From the `frontend/` directory, run:

```bash
npm start
```

The React frontend runs at `http://localhost:3000` and automatically proxies `/api` requests to `http://localhost:8080`.

---

## 4. API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new account (`fullName`, `email`, `password`, `phone`, `role`)
- `POST /api/auth/login` — Sign in with `email` and `password`

### Resumes (`/api/resumes`) - *Requires Bearer Token*
- `GET /api/resumes` — List all resumes for current user
- `GET /api/resumes/{id}` — Get single resume by ID
- `POST /api/resumes` — Create a new resume
- `PUT /api/resumes/{id}` — Update an existing resume
- `DELETE /api/resumes/{id}` — Delete a resume

### Templates (`/api/templates`)
- `GET /api/templates` — List all resume templates
- `GET /api/templates/public/free` — List free templates

### Recruiter Search (`/api/recruiter`) - *Requires Bearer Token*
- `GET /api/recruiter/candidates` — List all public candidate resumes
- `GET /api/recruiter/search?keyword=...` — Search candidate resumes by keyword/skill/location
