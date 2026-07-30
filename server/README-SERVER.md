# Instructions

This scaffold contains a minimal full-stack starter for the Artisan Finder project.

Quick start (server):

1. cd server
2. npm install
3. copy .env.example to .env and edit if needed
4. npx prisma generate
5. npx prisma migrate dev --name init
6. npm run dev

Quick start (client):

1. cd client
2. npm install
3. copy .env.example to .env
4. npm run dev

API endpoints:
- POST /api/auth/register { name, email, password, role }
- POST /api/auth/login { email, password }
- GET /api/artisans?q=... (search)
- POST /api/artisans (auth required) create/update artisan profile
- GET /api/artisans/:id
- POST /api/bookings (auth required) { artisanId, date, time, description }
- GET /api/bookings (auth required) list bookings for user

