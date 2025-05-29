# Stage 1: Build Frontend
FROM node:18 AS frontend-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client ./
RUN npm run build

# Stage 2: Build Backend
FROM node:18 AS backend
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server ./

# Stage 3: Final Image
FROM node:18
WORKDIR /app
# Copy frontend build
COPY --from=frontend-build /app/client/dist ./client/dist
# Copy backend
COPY --from=backend /app/server ./server
# Serve frontend from backend
WORKDIR /app/server
RUN npm install --only=production
# Expose port
EXPOSE 5000
# Start the backend server
CMD ["node", "server.js"]