FROM node:13.12.0-alpine as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build:docker

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf