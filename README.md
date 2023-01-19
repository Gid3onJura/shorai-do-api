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

# Certificate Config

```
[req]
default_bits  = 4096
distinguished_name = req_distinguished_name
req_extensions = req_ext
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
countryName = DE
stateOrProvinceName = Saxony-Anhalt
localityName = Halle
organizationName = shorai-do-kempo
commonName = Localhost ssc

[req_ext]
subjectAltName = @alt_names

[v3_req]
subjectAltName = @alt_names

[alt_names]
IP.1 = 127.0.0.1
```

- save it as 'san.config' in **./security** directory

# Self-signed Certificate

- erstellt Zertifikat mit Schlüssel

```
> openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout key.pem -out cert.pem -config ./security/san.config
```

- zum nachlesen, was im Zertifikat enthalten ist

```
> openssl x509 -in cert.pem -text -noout
```
