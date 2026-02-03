# VoxelVibe Portfolio

## Overview

A modern, animated portfolio website showcasing 3D Design and Robotics work. Built as a full-stack application with a React frontend and Express backend, featuring a futuristic dark theme with neon cyan and purple accents. The site displays project galleries with auto-rotating images, contact form functionality, and smooth scroll animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for scroll reveals and transitions
- **Build Tool**: Vite

The frontend follows a page-based structure with shared components. Pages include Home, Projects, ProjectDetails, and Contact. Custom hooks abstract API calls (`use-projects`, `use-contact`).

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Design**: RESTful endpoints defined in `shared/routes.ts`
- **Validation**: Zod schemas for input validation (integrated with Drizzle via drizzle-zod)

The server handles project listings and contact form submissions. Routes are registered in `server/routes.ts` with database operations abstracted through a storage layer (`server/storage.ts`).

### Shared Code
- `shared/schema.ts`: Database table definitions and TypeScript types
- `shared/routes.ts`: API endpoint definitions with Zod schemas for type-safe client-server communication

### Database Schema
Two tables:
1. **projects**: id, title, description, category, images (array), videoUrl, videoUrls (array), repoUrl, demoUrl, tags (array)
2. **contact_messages**: id, name, email, message, createdAt

### Build Process
- Development: Vite dev server with HMR, proxying API requests to Express
- Production: Vite builds static assets, esbuild bundles the server

## External Dependencies

### Database
- PostgreSQL (connection via `DATABASE_URL` environment variable)
- Drizzle Kit for schema migrations (`npm run db:push`)

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `framer-motion`: Animation library
- `drizzle-orm` / `drizzle-zod`: Database ORM and schema validation
- `zod`: Runtime type validation
- Radix UI primitives: Accessible UI components
- `wouter`: Client-side routing
- `react-hook-form` with `@hookform/resolvers`: Form handling

### Fonts
- Orbitron (display font) - loaded from Google Fonts
- Inter (body font) - loaded from Google Fonts

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner`: Development tools