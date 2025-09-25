# Multi-stage build for optimization (optional - for this simple app, single stage works fine)
# FROM node:16-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --only=production

# Production stage
FROM nginx:alpine

# Set maintainer information
LABEL maintainer="winnerselekwachi@gmail.com"
LABEL description="Tic-Tac-Toe Game - Modern responsive web game"
LABEL version="1.0.0"

# Create app directory
WORKDIR /usr/share/nginx/html

# Remove default nginx website files
RUN rm -rf /usr/share/nginx/html/*

# Copy our game files to the nginx directory
# The . copies all files from current directory (where Dockerfile is located)
# to the nginx html directory inside the container
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY service-worker.js /usr/share/nginx/html/

# Copy custom nginx configuration for better performance and security
COPY nginx.conf /etc/nginx/nginx.conf

# ... (previous lines)

# Create a new user with UID 101, no password, no home directory, and a non-login shell
RUN adduser -D -s /usr/sbin/nologin nginx

# Set proper permissions for nginx files
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /etc/nginx/conf.d

# Create directory for nginx PID file
RUN mkdir -p /var/run/nginx \
    && chown -R nginx:nginx /var/run/nginx

# Switch to non-root user for security
USER nginx

# Expose port 80 (the port our app runs on)
EXPOSE 80

# Health check to ensure container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start nginx in the foreground (required for Docker containers)
# -g "daemon off;" keeps nginx running in foreground so container doesn't exit
CMD ["nginx", "-g", "daemon off;"]