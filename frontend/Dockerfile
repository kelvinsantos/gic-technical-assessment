# base image
FROM node:16.16.0-alpine as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

EXPOSE 3000

# start app
CMD ["npm", "start"]
