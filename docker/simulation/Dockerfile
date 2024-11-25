FROM node:18-alpine as base

ARG API_URL

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./

#Package simulation-build
FROM base as simulation-build
WORKDIR /app/packages/simulation
COPY ./packages/simulation/package.json package.json

WORKDIR /app/
RUN npx lerna bootstrap --scope=simulation --includeDependencies

WORKDIR /app/packages/simulation
COPY ./packages/simulation/ ./

RUN npm run build

WORKDIR /app/packages/simulation/dist

EXPOSE 8080

CMD ["node", "main.js"]
