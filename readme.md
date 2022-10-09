## WEARO Rebuild

## Frontend link: https://wearo.netlify.app/

# Requirement

##### Node version >= 16.13.2

##### TypeScript

##### PostgreSQL

##### Redis

##### AWS S3 Bucket

##### `.env` file for both server and client

## Installation

##### Node: Download in [Node.js Official Site](https://nodejs.org/en/)

##### PostgreSQL: Download in [PostgreSQL Official Site](https://www.postgresql.org/download/).

##### Redis: Download in [Redis Official Site](https://redis.io/download/)

##### TypeScript: `npm install -g typescript`

### Using the App Locally

#### Commands:

    npm run install-all
    npm run build-all
    npm run watch

#### Seeding the database

    npm run seed

#### env variables for client

    VITE_SERVER_URL

#### env variables for server

    DATABASE_URL=postgres://username:password@host:port/databases
    ACCESS_TOKEN_SECRET
    REFRESH_TOKEN_SECRET
    WEARO_AWS_BUCKET_NAME
    WEARO_AWS_BUCKET_REGION
    WEARO_AWS_ACCESS_KEY
    WEARO_AWS_SECRET_KEY
    REDIS_URL(CAN BE EMPTY)
    REDIS_PASSWORD(CAN BE EMPTY)

## Tech Stack

##### `Frontend:` React TypeScript, Vite, SASS, React DOM

##### `Backend:` Express TypeScript, Prisma, AWS S3, JWT

##### `Databases:` Postgresql, Redis
