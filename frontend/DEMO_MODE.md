# Standalone Demo Mode (no backend required)

This copy of the frontend has its API layer (`src/services/api.js`) replaced with a
**mock backend that runs entirely in your browser's localStorage**. No Spring Boot
server, no network calls — everything works end-to-end for a demo:

- Register a new account (job seeker, recruiter, or hiring manager)
- Log in / log out
- Create, edit, and delete resumes with education/experience/skills
- Browse the template library
- Search candidates as a recruiter (only resumes that candidates have opted to share appear here)

## Run it
```bash
npm install
npm start
```
Opens at http://localhost:3000.

## Notes on the mock mode
- Data is stored in your browser's localStorage, not a real database — it persists
  across refreshes but is specific to that browser and will reset if you clear
  site data.
- Passwords are stored in plain text in localStorage (fine for a demo, never do
  this in production).
- Every function in `api.js` matches the real backend's function names and
  response shape (`{ data: ... }`), so the page components (Login, Dashboard,
  ResumeBuilder, etc.) needed zero changes.

## Switching back to the real Spring Boot backend
Open `src/services/api.js` — the original axios-based implementation is included
at the bottom of the file in a comment block. Replace the file's contents with
that block, then run the backend (`cd backend && mvn spring-boot:run`) alongside
`npm start`.
