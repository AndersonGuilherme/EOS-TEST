#!/bin/sh

node ace migration:run --force

node ace build --production --ignore-ts-errors

cp .env build/.env

cd build

npm i --production

node server.js
