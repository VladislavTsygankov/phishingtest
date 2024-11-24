FROM node:18-alpine as base

ARG API_URL

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./


#Package frontend-build
FROM base as frontend-build
WORKDIR /app/packages/frontend
COPY ./packages/frontend/package.json package.json

WORKDIR /app/
RUN npx lerna bootstrap --scope=frontend --includeDependencies

WORKDIR /app/packages/frontend
COPY ./packages/frontend/ ./

ENV NODE_ENV=production
ENV VITE_API_URL=${API_URL}

RUN npm run build

# Production image runner
FROM kiweeteam/nginx-brotli:1.25.5 AS runner
COPY --from=frontend-build /app/packages/frontend/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/frontend/nginx.conf /etc/nginx/conf.d/nginx.conf

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


