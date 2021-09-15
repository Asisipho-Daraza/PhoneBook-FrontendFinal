FROM node:14.15.0-alpine3.10

WORKDIR /app

COPY . .

RUN npm i -g @angular/cli@12.2.4
RUN npm install -g json-server

RUN npm i
RUN npm run build:prod

EXPOSE $PORT

CMD [ "npm", "run" , "start:prod" ]