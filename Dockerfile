FROM node:lts AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn add glob rimraf
RUN yarn add --only=development
COPY . .
RUN npm run build

FROM node:lts as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn add --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["yarn", "start:prod"]