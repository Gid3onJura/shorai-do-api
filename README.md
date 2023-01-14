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

# Self-signed Certifcate

```
> openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
```

```
> openssl rsa -in keytmp.pem -out key.pem
```

```
> openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
