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

- "openssl req -nodes -new -x509 -keyout server.key -out server.cert" create a self-sigend certificate
- via Postman: goto https://stackoverflow.com/questions/57424532/postman-error-self-signed-certificate-in-certificate-chain and set up your postman for the created certificate
