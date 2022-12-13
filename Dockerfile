FROM node:alpine

# Create app directory
WORKDIR /app
# Install app dependencies
COPY client/package*.json ./
RUN npm install
# Bundle app source
COPY client/ .
# Build app
RUN npm run build

# Create server directory
WORKDIR /server
# Install server dependencies
COPY server/package*.json ./
RUN npm install

# create a public directory
RUN mkdir public
# Move build files to server directory
RUN mv /app/dist/* /server/public/

# Bundle server source
COPY server/ .

# Run server
EXPOSE 8080
CMD [ "npm", "start" ]