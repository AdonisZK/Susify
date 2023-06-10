# Susify_new

## Important
- Check server\prisma\schema.prisma
- Max Price 10.000 for safety reasons.
- //PCheck for experimental

## Setup Guide
- Download Yarn
- Setup Postgresql https://www.youtube.com/watch?v=0n41UTkOBb0&t=386s
- Git Clone
- Masuk /server npm install
- Masuk /susify npm install
- Cek server/.env sesuain sama local 
- https://youtu.be/cJ7xvBkuqiA?t=6635 coba import db ke postgresql
- Cek table di postgres sama /server (npx prisma studio)
- /server yarn dev
- /susify yarn dev
- masuk localhost
- Coba login -> masukin data
- Setup Stripe change const stripe at server\controllers\OrderControllers.js, see [6:42:00] for more details

## Update DB Guide (Server)
### Will Remove Database
 - npx prisma generate
 - npx prisma migrate dev --create-only
 - npx prisma migrate dev

## Change Log
[6:00:00] Skipping bearer authentication
[6:42:00] Setup Stripe on .env