FROM node:22-alpine
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY ./public ./public/
COPY ./pages ./pages/
COPY package.json ./
COPY package-lock.json ./
COPY app.js ./
Run npm install
EXPOSE 3000
CMD ["npm", "run", "start" ]
