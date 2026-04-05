# Threads App Backend

A GraphQL backend for a Threads-style app built with Node.js, Express, Apollo Server, Prisma, and PostgreSQL.

## Project Overview

This repository contains the backend server for a thread application. It exposes a GraphQL API with support for creating users and fetching user data.

Key technologies:

- Node.js with ECMAScript modules
- Express 5
- Apollo Server 5
- Prisma ORM with PostgreSQL
- TypeScript
- dotenv for environment configuration

## Features

- `createUser` mutation to create new users
- `users` query to fetch all users
- Prisma-powered PostgreSQL data persistence
- GraphQL endpoint at `/graphql`

## Project Structure

- `src/index.ts` - application entrypoint and Apollo server setup
- `src/lib/db.ts` - Prisma client initialization
- `src/schema/users.ts` - GraphQL schema definitions
- `src/resolvers/users.ts` - GraphQL resolvers for queries and mutations
- `prisma/schema.prisma` - Prisma schema model definitions
- `generated/prisma/` - generated Prisma client code

## Requirements

- Node.js 20+ (or newer)
- PostgreSQL database
- Docker (optional, if using Docker Compose)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file at the project root with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
```

Example for a local Docker/Postgres setup:

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/threads?schema=public"
```

3. Generate the Prisma client:

```bash
npm run prisma-generate
```

4. Run Prisma migrations to create the database schema:

```bash
npm run prisma-migrate -- --name <migration-name>
```

> If you are using Docker Compose, start the database first:
>
> ```bash
> docker-compose up -d
> ```

## Development

Run the project in development mode:

```bash
npm run dev
```

This builds the TypeScript code and starts the compiled server at `dist/src/index.js`.

## Production

Build and run the server manually:

```bash
npx tsc
npm start
```

## GraphQL API

The server exposes a GraphQL endpoint at:

```text
http://localhost:8000/graphql
```

### Available operations

#### Mutation: `createUser`

Create a user with the following input fields:

```graphql
mutation {
  createUser(
    firstName: "John"
    lastName: "Doe"
    email: "john@example.com"
    password: "secret"
    profileImageUrl: "https://example.com/avatar.png"
  )
}
```

#### Query: `users`

Fetch all users:

```graphql
query {
  users {
    id
    firstName
    lastName
    email
    profileImageUrl
  }
}
```

## Notes

- The Prisma client uses `dotenv/config` to load `DATABASE_URL` from `.env`.
- The current schema stores user passwords and salts in plaintext for demo purposes only; in a real app, always hash passwords securely.
- The GraphQL server includes a basic `Query` root and a `Mutation` root.

## Troubleshooting

- If the server cannot connect to PostgreSQL, verify `DATABASE_URL` and confirm the database is running.
- If `npm run dev` fails, ensure `npx tsc` succeeds first.
- If `DATABASE_URL` is undefined, confirm the `.env` file exists and that `dotenv` is imported before Prisma is instantiated.
