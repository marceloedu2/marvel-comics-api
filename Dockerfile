FROM node:12.0.0

WORKDIR /app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY .env ./
COPY package*.json ./

RUN yarn

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3333

CMD [ "node", "disc/src/server.js" ]
