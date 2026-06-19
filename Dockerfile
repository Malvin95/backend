FROM node:22 AS builder
# WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]

# FROM node:22
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --omit=dev
# EXPOSE 3000
# CMD ["node", "dist/index.js"]
