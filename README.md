# Smart Career Assistant

Smart Career Assistant is a production-oriented full-stack application that generates tailored resume content from a job description and a candidate's skills. The backend is built with Spring Boot, MongoDB Atlas, Auth0, and the Groq REST API. The frontend is built with React, Vite, Tailwind CSS, and Auth0.

## Project Structure

```text
.
|-- src/                          Spring Boot backend
|-- frontend/                     React + Vite frontend
|-- pom.xml                       Backend dependencies
|-- .env.example                  Backend environment template
`-- README.md
```

## Features

- AI generation endpoint for resume summaries, ATS skills, project descriptions, and cover letters
- MongoDB Atlas persistence for generation history
- Auth0-protected history APIs and frontend routes
- Tailwind-based responsive UI
- Copy-to-clipboard and PDF export
- Structured DTOs, service layer, repository layer, and global exception handling

## Backend Setup

### Prerequisites

- Java 17
- Maven 3.9+
- MongoDB Atlas database
- Auth0 API and SPA application
- Groq API key

### Environment Variables

Create a local `.env` file or export these values in your shell:

```properties
MONGODB_URI=
AUTH0_ISSUER_URI=
AUTH0_AUDIENCE=
FRONTEND_URL=http://localhost:5173
GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant
GROQ_URL=https://api.groq.com/openai/v1/chat/completions
```

### Run Backend

```bash
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

## Frontend Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Frontend Environment

Create `frontend/.env` from `frontend/.env.example`:

```properties
VITE_API_BASE_URL=http://localhost:8080
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
```

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Deployment

### Backend on Render

- Create a new `Web Service` from this repository or use `render.yaml`.
- Choose the `Docker` environment.
- Render will build from the root `Dockerfile`.

- Set these Render environment variables:

```properties
MONGODB_URI=
AUTH0_ISSUER_URI=https://sharmavishal1.us.auth0.com/
AUTH0_AUDIENCE=https://smart-career-assistant-api
FRONTEND_URL=https://your-vercel-domain.vercel.app
GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant
GROQ_URL=https://api.groq.com/openai/v1/chat/completions
```

### Frontend on Vercel

- Import the repository into Vercel.
- Set the project root directory to `frontend`.
- Set these Vercel environment variables:

```properties
VITE_API_BASE_URL=https://your-render-service.onrender.com
VITE_AUTH0_DOMAIN=sharmavishal1.us.auth0.com
VITE_AUTH0_CLIENT_ID=sMUn4R0VLOftNTiEZ44fZJsYeLLPP2l8
VITE_AUTH0_AUDIENCE=https://smart-career-assistant-api
```

### Auth0 Production URLs

- Allowed Callback URLs: `https://your-vercel-domain.vercel.app`
- Allowed Logout URLs: `https://your-vercel-domain.vercel.app`
- Allowed Web Origins: `https://your-vercel-domain.vercel.app`
- Allowed Origins (CORS): `https://your-vercel-domain.vercel.app`

## API Endpoints

### `POST /api/ai/generate`

Public endpoint.

```json
{
  "jobDescription": "Senior Java developer role...",
  "skills": "Java, Spring Boot, MongoDB, React"
}
```

### `POST /api/history/save`

Protected endpoint. Requires Auth0 bearer token.

```json
{
  "jobDescription": "Senior Java developer role...",
  "skills": "Java, Spring Boot, MongoDB, React",
  "generatedContent": {
    "summary": "....",
    "atsSkills": ["Java", "Spring Boot"],
    "projectDescriptions": ["Project 1", "Project 2"],
    "coverLetter": "...."
  }
}
```

### `GET /api/history/{userId}`

Protected endpoint. Requires Auth0 bearer token matching the requested `userId`.

## Auth0 Notes

- Configure an Auth0 API with the same audience used by both backend and frontend.
- Configure the SPA callback URL as `http://localhost:5173`.
- Configure the logout URL as `http://localhost:5173`.

## Groq Prompting

The backend uses Groq chat completions with JSON object mode so the AI response can be parsed into the resume content DTO reliably.

## Production Notes

- Restrict CORS to your deployed frontend domain through `FRONTEND_URL`.
- Move secrets into your deployment environment or secret manager.
- For deployment, build the frontend with `npm run build` and serve it separately from the Spring Boot API.
