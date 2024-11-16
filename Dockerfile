# Étape 1 : Construire l'application Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 2 : Servir les fichiers avec Caddy
FROM caddy:2
COPY --from=build /app/dist/lorcanaDex /srv
COPY Caddyfile /etc/caddy/Caddyfile