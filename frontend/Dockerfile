FROM node:18-alpine as build-stage

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/.next ./.next
COPY --from=build-stage /usr/src/app/public ./public
COPY --from=build-stage /usr/src/app/package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]