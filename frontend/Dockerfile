FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Этот образ только собирает фронтенд, артефакты будут подключаться как volume в nginx

