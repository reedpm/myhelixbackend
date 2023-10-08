FROM node:18-alpine

WORKDIR /usr/
COPY package.json .
RUN npm install
COPY . .
CMD npm start