FROM node:latest
MAINTAINER Gabriel Ribeiro
ENV MONGODB=mongodb://mongodb:27017/pdv
COPY . /var/www
WORKDIR /var/www
RUN npm install --only=production
ENTRYPOINT npm start
EXPOSE 3000