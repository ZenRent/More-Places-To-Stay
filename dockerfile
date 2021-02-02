FROM node:14.15.1

WORKDIR /MorePlaces

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3004

EXPOSE 3004