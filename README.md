# Susify

## Important
- Check server\prisma\schema.prisma
- Max Price 10.000 for safety reasons.
- SELECT tgname FROM pg_trigger;
- Logout by deleting cookies

## Setup Guide
- Download Yarn
- Setup Postgresql https://www.youtube.com/watch?v=0n41UTkOBb0&t=386s
- Git Clone
- Masuk /server npm install
- Masuk /susify npm install
- Cek server/.env sesuain sama local 
- Import db ke postgresql
- Cek table di postgres sama /server (npx prisma studio)
- Insert query di server\listing_log_trigger.sql & server\listing_log_trigger.sql ke pgadmin4 for trigger
- /server yarn dev
- /susify yarn dev
- Localhost
- Coba login -> masukin data
- https://stripe.com/docs/testing for confirm payment

## Setup/Update DB Guide (Server)
### Will Remove Database
 - npx prisma generate
 - npx prisma migrate dev --create-only
 - npx prisma migrate dev

