# Multi-stage build for production-like setup
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build production bundle
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
