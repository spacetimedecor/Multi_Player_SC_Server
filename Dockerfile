FROM node:12.18.1
#ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm install --development
CMD ["node", "src/index.js"]
