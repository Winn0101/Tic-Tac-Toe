FROM nginx:alpine

LABEL maintainer="winnerselekwachi@gmail.com"
LABEL description="Tic-Tac-Toe Game - Modern responsive web game"
LABEL version="1.0.0"

WORKDIR /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY service-worker.js /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

# Set proper permissions for nginx files
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /etc/nginx/conf.d

RUN mkdir -p /var/run/nginx \
    && chown -R nginx:nginx /var/run/nginx

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
