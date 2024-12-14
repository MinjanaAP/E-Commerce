FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env .env

EXPOSE 3000

CMD ["npm", "run", "start"]