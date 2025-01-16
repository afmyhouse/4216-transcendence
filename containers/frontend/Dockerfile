FROM nginx:1.25.5-bookworm
RUN apt-get update
COPY ./www ./var/www
COPY ./tools/default.conf /etc/nginx/conf.d/default.conf