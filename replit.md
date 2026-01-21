# VoxelVibe Portfolio

## Overview

A modern, animated portfolio website for showcasing 3D Design & Robotics work. Built as a full-stack application with a React frontend and Express backend, featuring a futuristic dark theme with neon cyan and purple accents. The site displays projects with image galleries, contact form functionality, and smooth scroll animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side navigation (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom CSS variables for theming, shadcn/ui component library
- **Animations**: Framer Motion for scroll reveals and UI transitions
- **State Management**: TanStack React Query for server state and data fetching
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Server**: Express.js (v5) running on Node.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Development**: Vite dev server with HMR proxied through Express

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains table definitions for `projects` and `contactMessages`
- **Migrations**: Drizzle Kit for schema management (`npm run db:push`)

### Project Structure
```
client/           # React frontend
  src/
    components/   # Reusable UI components
    pages/        # Route pages (Home, Projects, Contact)
    hooks/        # Custom React hooks for data fetching
    lib/          # Utilities and query client config
server/           # Express backend
  routes.ts       # API route handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared between client/server
  schema.ts       # Drizzle table definitions
  routes.ts       # API route definitions with Zod schemas
```

### Key Design Patterns
- **Type Sharing**: Zod schemas in `shared/routes.ts` ensure type safety across client and server
- **Storage Interface**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Component Library**: shadcn/ui components provide consistent, accessible UI primitives
- **Custom Hooks**: `use-projects.ts` and `use-contact.ts` encapsulate API calls with React Query

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle ORM for type-safe database queries
- `connect-pg-simple` for session storage capability

### UI/Frontend Libraries
- Radix UI primitives (dialogs, dropdowns, forms, etc.)
- Framer Motion for animations
- Lucide React for icons
- Embla Carousel for image carousels

### Build Tools
- Vite for frontend bundling with React plugin
- esbuild for server bundling
- TypeScript for type checking

### Fonts
- Orbitron (display font for headings)
- Inter (body text)
- Loaded via Google Fonts CDN