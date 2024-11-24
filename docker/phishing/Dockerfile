FROM node:18-alpine as base

ARG API_URL

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./

#Package phishing-build
FROM base as phishing-build
WORKDIR /app/packages/phishing
COPY ./packages/phishing/package.json package.json

WORKDIR /app/
RUN npx lerna bootstrap --scope=phishing --includeDependencies

WORKDIR /app/packages/phishing
COPY ./packages/phishing/ ./

RUN npm run build

WORKDIR /app/packages/phishing/dist

EXPOSE 8080

CMD ["node", "main.js"]
