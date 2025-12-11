FROM node:20-alpine

WORKDIR /app

COPY app/package*.json ./
RUN npm ci --omit=dev --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
