FROM node:18 AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build


FROM node:18 AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./


FROM node:18-slim
WORKDIR /app
RUN useradd -m appuser

COPY --from=frontend-build /app/client/build ./client/build

COPY --from=backend-build /app/server ./server

RUN chown -R appuser:appuser /app

USER appuser

WORKDIR /app/server

EXPOSE 5000
CMD ["node", "server.js"]
