# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time env var — Vite bakes this into the bundle at build time
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production  
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
