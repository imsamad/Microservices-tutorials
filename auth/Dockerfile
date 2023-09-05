FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --omit=dev
COPY . .
CMD ["npm","run","start"]