# Faster Local Development with Lando

A setup of Strapi and Nextjs for the Faster Local Development with Lando live talk. This local installation is running Postgres and Meilisearch along with Strapi inside Lando containers and Nextjs from a separate directory.

[Presentation available at Figma.](https://www.figma.com/proto/dCb3GckBfiLSO7Oz9lKo9C/Faster-local-development-with-Lando?node-id=1%3A3&viewport=241%2C48%2C0.59&scaling=min-zoom&page-id=1%3A2&starting-point-node-id=1%3A3)

Presentation video: tbd

## Tools I used in the talk

- [figma.com](https://figma.com) for presenting

- [insomnia.rest](https://insomnia.rest) for API requests

- vscode

## Getting started on the api

`lando start` to bring up the containers

`lando yarn develop` to bring up the Strapi cms which will then be accessible at [http://faster-localdev-cms.lndo.site/](http://faster-localdev-cms.lndo.site/)

### Lando

The lando configuration file is `.lando.yml` which contains all the setup needed for local development.

The localhost:48291 is accessible at `faster-localdev-cms.lndo.site` once you run `lando yarn develop` or `lando yarn start`. This is mapped to the `proxy` in the lando config.

#### Local environment

Strapi expects a .env for any required environment variables. `.env.example` will contain all the variables you might need for working with lando, with external secrets removed.

#### Plugin development with --watch-admin

If you run `lando yarn develop` with `--watch-admin` then the main .lndo.site will not be accessible as the admin will run on a different port. You'll need to use [http://localhost:48296/](http://localhost:48296/) for that.

### Database dump and import

[Postgres docs: backup-dump](https://www.postgresql.org/docs/9.1/backup-dump.html)

Dumping a database on **lando**:  
`lando pg_dump strapi -U postgres -O -x > backupname.sql`

[Postgres docs: app-pgdump](https://www.postgresql.org/docs/9.4/app-pgdump.html)

Importing a database to **lando**:  
`lando psql -U postgres strapi < backupname.sql`

If you aren't importing the database into a fresh **lando** container you will need to drop the database first by running:  
`lando drop_database`

The commands will run as the postgresql user inside the database container, these are configured under the `tooling` section in the lando config.

### Meilisearch on Lando

Meilisearch will run in its own container and be accessible locally (in development mode) on the [http://meilisearch.faster-localdev.lndo.site](http://meilisearch.faster-localdev.lndo.site) endpoint. In order to view the indeces you will need a private key which you can get by sending a request to `/keys` with the header key and value `X-Meili-API-Key: {key}`, the key will be found in the lando config.

Example:

```none
GET http://meilisearch.faster-localdev.lndo.site/keys
{
  X-Meili-API-Key: 'LandoMeilisearchMasterKey'
}
```

In your .env you will need to make sure that `MEILISEARCH_HOST` is set to the right endpoint and that `MEILISEARCH_API_KEY` is also set to the master key.

## Getting started on the frontend

Copy the `.env.example` to `.env` for local development.

Start up lando:

`lando start` and make sure that your dependencies are installed afterwards with `lando yarn install`.

Run the development server:

```bash
lando yarn dev
```

Your site should now be accessible at [http://faster-localdev-site.lndo.site](http://faster-localdev-site.lndo.site)

You can test builds by running:

```bash
lando yarn build
```

__Important:__ Only run `yarn` and not `npm` as we follow the rules of `yarn.lock` and they can differ in how they resolve node modules.

### Known issues

The current version of the `@meilisearch/instant-meilisearch` package is locked to `0.5.0` because we're still using Meilisearch 0.19 on the backend, this package can only be updated once we upgrade to the latest version of Meilisearch as there are breaking changes.
