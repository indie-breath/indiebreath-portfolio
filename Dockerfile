FROM node:22-alpine
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY ./pages ./pages
COPY ./public ./public
COPY package.json ./
COPY package-lock.json ./
COPY app.js ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start" ]
