FROM node:8.14.0-alpine

# Create app directory
WORKDIR /usr/src/app

# ENV
ENV SECRET=production_secret

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "production" ]