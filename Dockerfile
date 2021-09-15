FROM node:lts-jessie

RUN apt-get update

RUN apt-get install -y netcat

WORKDIR /usr/src/weather-bot

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "main.js"]
