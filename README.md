# Nodejs Starter

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [PostgreSQL](https://www.postgresql.org/download/) / [MySQL](https://www.mysql.com/downloads/) / [SQLite](https://www.sqlite.org/download.html)

## Setup

Clone the repository and run

    $ yarn   # or npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ yarn migrate
    $ yarn seed

Finally, start the application.

    $ yarn start:dev (For development)
    $ NODE_ENV=production yarn start (For production)

Navigate to http://localhost:8848/api-docs/ to verify installation.

## Creating new Migrations and Seeds

These are the commands to create a new migration and corresponding seed file.

    $ yarn make:migration <name>
    $ yarn make:seeder <name>

Example,

    $ yarn make:migration create_tags_table
    $ yarn make:seeder 02_insert_tags

## Using Docker

### Using docker-compose

Use [docker-compose](https://docs.docker.com/compose/) to quickly bring up a stack with pre-configured Postgres database container. Data is ephemeral and containers will disappear when stack is removed.

Specific configuration for Docker is in `.env.docker`

- `0.0.0.0` as `$APP_HOST` to expose app on Docker network interface
- Pre-configured Postgres settings - can be updated to point to another Postgres host

Bring up stack,

    $ docker-compose up

Navigate to http://localhost:8848/api-docs/ to verify application is running from docker.

Bring down stack,

    $ docker-compose down

### Multi-stage docker builds

There are multiple build targets available for different stages. These images can be used to deploy or run jobs in different container based cloud infrastructure like Kubernetes, AWS ECS, Fargate, GCP Cloud Run etc.

1. Building a production image.

   ```bash
   $ docker build --target=prod -t app:prod .
   ```

2. Building an image for development.

   ```bash
   $ docker build --target=dev -t app:dev .
   ```

3. Building an image that runs migration and/or rollback.

   ```bash
    # Docker image that runs migration and seeds.
    $ docker build --target=migrate -t app:migrate .

    # Docker image that rollbacks migrations.
    $ docker build --target=migrate-rollback -t app:migrate-rollback .
   ```

Once the images have been built - all you need to do is run them providing a `.env` file. Like this:

```bash
$ docker run -v "/path/to/your/.env:/app/.env" app:migrate
```

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the connections for test database.

    $ NODE_ENV=test yarn migrate
    $ yarn test

Run tests with coverage.

    $ yarn test:coverage

