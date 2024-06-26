# Susify
## Final Project Manajemen Basis Data (D) 

## Setup Guide
- Install Yarn https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable
- Install Postgresql https://www.postgresql.org/download/
- On /server npm install
- On /susify npm install
- Adjust server/.env 
- Import db to postgresql
- Insert trigger

## Initial configuration
Create an `.env` file and setup the variables

```
cp .env.example .env
```

Migrate with prisma in order to create the required database tables
```
npx prisma migrate deploy
```

or

```
yarn prisma migrate deploy
```

## Run
- On /server yarn dev
- On /susify yarn dev
- https://stripe.com/docs/testing (payment)

## Reference
![Untitled-1](https://github.com/AdonisZK/Susify/assets/48209612/8ed29981-d472-4a69-b0f1-37d705231d65)
- Express : https://expressjs.com/
- Next.js : https://nextjs.org/
- Tailwind CSS : https://tailwindcss.com/
- Node.js: https://nodejs.org/en
- Stripe : https://stripe.com/
- PostgreSQL : https://www.postgresql.org/
- Prisma : https://www.prisma.io/
- https://github.com/koolkishan/fiver-clone


## Preview
![Screenshot 2023-07-12 195952](https://github.com/AdonisZK/Susify/assets/48209612/3a6ff9ce-3406-43d5-bf0a-8ae1953a3c24)
