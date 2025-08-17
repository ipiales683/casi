# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a comprehensive legal services platform called "Sistema Legal Profesional - Portal Web Completo" (Professional Legal System - Complete Web Portal) for Abogado Wilson. It's a React-based web application with TypeScript, Tailwind CSS, and integrations with Cloudflare Workers, Supabase, and various external APIs.

The system serves multiple user roles:
- **Public visitors**: Access to services, blog, courses catalog
- **Registered clients**: Personal dashboard, course enrollment, purchase history, consultation scheduling
- **Administrators**: Complete management panel for clients, products, courses, analytics

## Development Commands

### Core Development
```bash
# Install dependencies
npm install

# Start development server (port 3000, opens browser automatically)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start Cloudflare Worker (development)
npm run start:worker

# Deploy to Cloudflare (same as npm run deploy:worker)
npm run deploy
```

### Code Quality & Maintenance
```bash
# Type checking
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean

# Generate lockfile only
npm run generate-lockfile

# View deployment logs
npm run tail-logs
```

### Database & Development Tools
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

### Quick Start Options
The project includes automated setup scripts:
```bash
# PowerShell (Windows - recommended)
.\iniciar-localhost.ps1

# With clean install
.\iniciar-localhost.ps1 -Clean

# Command prompt (Windows)
iniciar-localhost.bat

# Unix/Linux
./deploy.sh
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 18.2 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API (Auth, Theme, Cart, Credits, Tokens)
- **Routing**: React Router DOM v6
- **Backend**: Cloudflare Workers + Supabase
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Deployment**: Cloudflare Pages + Workers

### Core Context Providers
The app uses a layered context architecture in `src/main.tsx`:
```
BrowserRouter
└── ThemeProvider (dark/light theme)
    └── AuthProvider (Supabase auth)
        └── CreditProvider (user credits system)
            └── TokenProvider (API tokens)
                └── CartProvider (e-commerce)
```

### Layout System
Four main layouts in `src/layouts/`:
- **PublicLayout**: For unauthenticated pages (homepage, services, blog)
- **DashboardLayout**: For authenticated user dashboards
- **MainLayout**: Basic authenticated layout
- **EditorLayout**: For content editing (admin)

### Routing Structure
- **Public routes**: `/`, `/services`, `/blog`, `/courses`, `/login`, `/register`
- **Dashboard routes**: `/dashboard/*` (role-based access)
  - Client routes: `/dashboard/client`, `/dashboard/my-courses`, `/dashboard/my-purchases`
  - Admin routes: `/dashboard/admin`, `/dashboard/clients`, `/dashboard/analytics`
- **E-commerce routes**: `/checkout`, `/catalog`, `/products`
- **Editor routes**: `/editor/*` (content management)

### Authentication & Authorization
- Uses Supabase Auth with JWT tokens
- Role-based access control (`user.role === 'admin'` vs `'client'`)
- Protected routes with automatic redirects to `/login`
- Auth state managed in `AuthContext` with session persistence

### Data Layer
- **Supabase**: Primary database and real-time subscriptions
- **Context APIs**: Client-side state management
- **Local Storage**: Cart persistence, theme settings
- **External APIs**: 
  - Google Gemini AI for legal consultations
  - N8N for automation workflows
  - PayPal for payments
  - WhatsApp integration

## Key Configuration Files

### Environment Variables (.env)
Extensive configuration including:
- Supabase: URL and keys
- Google OAuth credentials
- Gemini AI API key
- Cloudflare tokens and IDs
- Social media links
- WhatsApp integration

### Cloudflare Configuration (wrangler.toml)
- Worker name: `abogado-wilson`
- KV namespace for caching
- D1 database binding
- Environment-specific routes
- Custom variables for production

### Build Configuration
- **Vite**: Modern build tool with optimized chunking strategy
- **TypeScript**: Strict mode enabled with path mapping (`@/*` aliases)
- **Tailwind**: Custom color scheme with primary/secondary palettes
- **PostCSS**: Autoprefixer for browser compatibility

## Development Patterns

### Component Organization
```
src/components/
├── Dashboard/          # Admin and client dashboards
├── Cart/              # E-commerce components
├── Services/          # Legal services display
└── ui/                # Reusable UI components
```

### Theme System
- Dark/light mode toggle via `ThemeContext`
- Persistent in localStorage
- CSS classes applied to document root
- Custom color palette in Tailwind config

### Error Handling
- React Hot Toast for notifications
- Supabase error handling with user-friendly messages
- Fallback UI states for loading/error conditions
- Development vs production error modes

## Testing Strategy

**Note**: Test scripts are not currently configured in package.json, but test files exist in `src/tests/` with various test cases.

### Available Test Files
```bash
# Test files location
src/tests/
├── api.test.js          # API endpoint tests
├── auth.test.js         # Authentication tests  
├── e2e.test.js          # End-to-end tests
├── ebook.test.js        # Ebook functionality tests
├── integration.test.js  # Integration tests
└── routes.test.js       # Route tests
```

### Setting Up Tests
```bash
# To add test runner, install vitest (already in devDependencies)
# Add to package.json scripts:
# "test": "vitest"
# "test:watch": "vitest --watch"
# "test:coverage": "vitest --coverage"
```

## Deployment Process

### Development to Production
1. **Local development**: `npm run dev`
2. **Build verification**: `npm run build && npm run preview`
3. **Deploy**: `npm run deploy` (runs build + Cloudflare deployment)

### Cloudflare Workers Deployment
The project uses a clean, optimized worker (`cloudflare-worker-clean.js`) that:
- Serves static assets from `/dist`
- Handles API routes under `/api/*`
- Includes maintenance mode capability
- Proper CORS configuration
- Error handling with fallback responses

### Git Workflow
```bash
# Automated deployment (runs from deploy.sh)
git add .
git commit -m "Commit origin: Cloudflare ready, no errors"
git push origin main
wrangler deploy
```

## External Services Integration

### Supabase
- Authentication and user management
- Real-time database for content
- Row Level Security (RLS) enabled
- Email/OAuth providers configured

### AI Integration
- Google Gemini API for legal consultations
- Automated responses for common legal questions
- Context-aware conversation handling

### Payment Processing
- Multiple payment methods (PayPal, credit cards, crypto)
- Sandbox configuration for development
- Purchase history and digital product delivery

### Communication
- WhatsApp integration for client contact
- N8N automation workflows
- Email notifications via contact forms

## Security Considerations

### API Security
- JWT token-based authentication
- CORS properly configured for production domains
- Rate limiting on API endpoints
- Input validation using Zod schemas

### Environment Variables
- Sensitive keys stored in Cloudflare secrets
- Development vs production environment separation
- No secrets committed to repository

## Common Development Tasks

### Adding New Pages
1. Create component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update navigation in appropriate layout
4. Add to TypeScript types if needed

### Modifying the Theme
1. Update colors in `tailwind.config.js`
2. Modify theme context for additional properties
3. Test both light and dark modes
4. Verify responsive behavior

### Adding API Routes
1. Update Cloudflare worker for new endpoints
2. Add proper CORS handling
3. Implement error responses
4. Test with both development and production environments

### Database Schema Changes
1. Update Supabase schema via dashboard
2. Update TypeScript types
3. Run `npx prisma generate` if using Prisma
4. Test migration in development

This system is designed for professional legal service delivery with comprehensive client management, course delivery, and e-commerce capabilities.
