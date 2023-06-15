# Susify
## Final Project Manajemen Basis Data (D) 

## Setup Guide
- Install Yarn https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable
- Install Postgresql https://www.postgresql.org/download/
- On /server npm install
- On /susify npm install
- Adjust server/.env 
- Import db ke postgresql
- Insert trigger
- On /server yarn dev
- On /susify yarn dev
- https://stripe.com/docs/testing for confirm payment

## Setup/Update DB Guide (**Will Remove Database**)
 - npx prisma generate
 - npx prisma migrate dev --create-only
 - npx prisma migrate dev

## Reference
![Untitled-1](https://github.com/AdonisZK/Susify/assets/48209612/8ed29981-d472-4a69-b0f1-37d705231d65)
- Next.js : https://nextjs.org/
- Tailwind CSS : https://tailwindcss.com/
- Node.js: https://nodejs.org/en
- Stripe : https://stripe.com/
- PostgreSQL : https://www.postgresql.org/
- Prisma : https://www.prisma.io/
- https://github.com/koolkishan/fiver-clone
