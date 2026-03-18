# HireBot

> AI-powered recruiting platform with candidate scoring, pipeline management, interview scheduling, and hiring analytics.

## Features

- **Recruiting Dashboard** -- Overview of candidates, pipeline status, interview schedule, and AI match scores
- **Candidate Management** -- Search, filter, and review candidates with detailed profiles and AI-generated summaries
- **Hiring Pipeline** -- Kanban-style pipeline view tracking candidates through applied, screening, interview, offer, and hired stages
- **Interview Scheduler** -- Schedule and manage upcoming interviews with interviewer assignments
- **Skill Assessments** -- Create and manage technical assessments with scoring and candidate tracking
- **Recruiting Analytics** -- Time-to-hire, offer acceptance rate, cost-per-hire, source effectiveness, and conversion metrics
- **AI Match Scoring** -- Automated candidate-role matching with percentage-based AI scores

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Next.js 14 (App Router)             |
| Language  | TypeScript                          |
| AI        | OpenAI API                          |
| UI        | Tailwind CSS, Lucide React          |
| State     | Zustand                             |
| Toasts    | react-hot-toast                     |
| Dates     | date-fns                            |
| Backend   | Supabase (Auth + Database)          |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add Supabase and OpenAI credentials

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hirebot/
├── src/
│   └── app/
│       └── page.tsx          # Full app with dashboard, candidates, pipeline,
│                             # scheduler, assessments, analytics tabs
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## License

MIT
