FROM node:lts AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build
CMD ["npm","run","start:dev"]

FROM node:lts AS production
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]