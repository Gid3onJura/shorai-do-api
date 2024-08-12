# shorai-do-api

REST-Api for Shorai-Do-App's

# Let's begin

- MySQL-Datenbank aufsetzen
- .env-Datei anpassen unter #general und #database
- create-Script unter /data auf der Datennbank ausführen
- Postman-Collection einrichten (siehe auch unter /doc)
- npm install -> Pakete installieren

# Server starten

- DEV: npm run dev
- LIVE: npm run start

# Api-Doku

Unter [shorai-do-api/doc/doku.yaml](./doc/doku.yaml) ist eine vollständige Dokumentation der Schnittstelle. Eine aktuelle Postman-Collection liegt dem Ordner ebenfalls bei.

# Database - ORM Prisma

- Prisma installieren: ` npm install prisma --save-dev`
- Pisma initialisieren: ` npx prisma init --datasource-provider mysql`
  - hier mit MySql-Provider
- Database-Link setzen: ` DATABASE_URL` in der ` .env` setzen
  - Bsp.: ` DATABASE_URL="mysql://root:strongpassword@localhost:3306/shorai-do-api"`

## ORM Prisma - Bestehende Database als Schema

- https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project

## ORM Prisma - wichtige Befehle

- Bestehende Datenbank in das Prisma Schema kopieren: ` npx prisma db pull`
- Initiale Migration (Baseline database): ` npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql`
- Migration anlegen: ` npx prisma migrate dev --name name-of-the-migration`
- Migration ausspielen: ` npx prisma migrate deploy`
- Prisma-Client aktualisieren: ` npx prisma generate`
