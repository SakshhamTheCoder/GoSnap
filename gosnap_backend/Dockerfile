# Use the official Node.js image as the base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on (adjust based on your server.js)
EXPOSE 5000

# Command to run the Node.js backend
CMD ["npm", "run", "dev"]
