# Use the official Node.js image as the base image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install the dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
CMD ["pnpm", "run", "start:prod"]
