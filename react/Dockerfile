# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:20-alpine AS development

# Create app directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app

# start app
CMD ["npm", "start"]