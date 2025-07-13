# Instructions for Coding Agent

This is for the model to reference for the overall context about the repository. When something really meaningful changes, update this too.

## Architecture

This application is now deployed as a **unified Azure Web App** where both the frontend and backend are served from the same origin:

- **Frontend**: Uses ViteJs, written in TypeScript, React, Tailwind, and Zustand
- **Backend**: Express.js API server
- **Authentication**: Azure Web App Easy Auth (Microsoft SSO)
- **Deployment**: Single Azure Web App service

## URL Access

**Production URL**: `https://ganttapi-azb0dwemccbxbwds.westeurope-01.azurewebsites.net`

- Frontend application: Root URL
- API endpoints: `/api/*`
- Authentication: Automatically handled by Azure Web App Easy Auth

## Features

- Interactive Gantt chart with drag-and-drop functionality
- Feature areas and features management
- Release tracking with different types (Web, Native, Both)
- Dependency tracking for releases
- Microsoft SSO authentication (restricted to @microsoft.com users)
- Real-time data persistence

## Data Model

- **Feature Area**: Contains multiple features
  - Properties: id, name, features
- **Feature**: Represents a development feature with timeline
  - Properties: id, name, startDate, endDate, readonly, releases
- **Feature Release**: Represents a release milestone
  - Properties: id, name, type (Web/Native/Both), date

## Coding Style

    You are an expert developer in TypeScript, Node.js, Tailwind, React, Azure Web Apps.

    Key Principles
    - Write concise, technical responses with accurate TypeScript examples.
    - Prefer iteration and modularization over duplication.
    - Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
    - Use lowercase with dashes for directories (e.g., components/auth-wizard).
    - Favor named exports for components.

    TypeScript
    - Use "function" keyword for pure functions.
    - Use TypeScript for all code. Prefer interfaces over types.

    React
    - Use functional components and TypeScript interfaces.
    - Use declarative JSX.
    - Use const, for components.
    - Minimize 'use client', 'useEffect', and 'setState'. Favor react useContext when it makes sense.
    - Use error boundaries for unexpected errors: Implement error boundaries using error.tsx and global-error.tsx files.
    - Implement type-safe server actions with proper validation.
    - Handle errors gracefully and return appropriate responses.

    Naming Conventions
    - Booleans: Use auxiliary verbs such as 'does', 'has', 'is', and 'should' (e.g., isDisabled, hasError).
    - Filenames: Use lowercase with dash separators (e.g., auth-wizard.tsx).

    Component Structure
    - Break down components into smaller parts with minimal props.
    - Use react context for state when it makes sense.
    - Use composition to build complex components.

    Testing
    - Implement unit tests for utility functions and hooks.
    - Use integration tests for complex components and pages.

    Documentation
    - Provide clear and concise comments for complex logic.
    - Use JSDoc comments for functions and components to improve IDE intellisense.
    - Keep the README files up-to-date with setup instructions and project overview.
    - Do not add obvious comments. Do not restate what function name already says.
