# Base image for Node.js
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the backend server port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]

