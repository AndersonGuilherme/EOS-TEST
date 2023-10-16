FROM node:18-alpine

WORKDIR /usr/src

COPY package*.json ./

USER root

COPY . .

EXPOSE 3333 3333

RUN npm install --production

RUN npm i -g @adonisjs/cli

COPY ./start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

ENTRYPOINT ["sh", "/usr/local/bin/start.sh"]