FROM node:16 AS build

WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
