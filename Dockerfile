# Use a base image
FROM node:alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm ci

# Bundle app source
COPY . .

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run index.ts when the container launches
CMD npm run start
