# Bookstore Frontend

React web application for a bookstore with Material-UI interface, real-time data management, and role-based features.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **Material-UI (MUI)** for UI components
- **TanStack Query** for server state management
- **Zustand** for client state
- **React Hook Form + Zod** for form validation
- **React Router** for navigation

## Prerequisites

- Node.js 20+
- Backend API running at `http://localhost:8080`

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
```

## Key Features

- **User Interface:** Clean Material-UI design with responsive layout
- **Real-time Updates:** TanStack Query for automatic data synchronization
- **Type Safety:** Full TypeScript support with generated API types
- **Authentication:** JWT-based with automatic token refresh
- **Role-based Access:** Different features for User/Manager/Admin roles
- **Advanced Search:** Filter books by title, author, genre, price, etc.
- **Order Management:** Shopping cart, checkout, and order history

## Test Users

The following test accounts work with the backend API (all passwords: `password`):

| Email              | Password   | Role    | Access                            |
|--------------------|------------|---------|-----------------------------------|
| `user@test.com`    | `password` | USER    | Browse and purchase books         |
| `manager@test.com` | `password` | MANAGER | User features + inventory management |
| `admin@test.com`   | `password` | ADMIN   | Full access to all features       |

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── layout/        # Layout components
├── services/      # API service layer
├── hooks/         # Custom React hooks
├── store/         # Zustand stores
├── router/        # Router configuration
├── types/         # TypeScript types
├── schemas/       # Zod validation schemas
└── utils/         # Utility functions
```

## Docker

The frontend can be run in Docker with production build served by nginx. See root `docker-compose.yml`.
