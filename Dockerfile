# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /front-project

# Copy the application files into the working directory
COPY . /front-project

# Install the application dependencies
RUN npm install

# Build the React application
RUN npm run build:prod

# Define the entry point for the container
CMD ["npm", "start"]
