# Base image for building React applications
FROM node:18 AS build

# Set environment variable to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) and install dependencies
COPY package*.json ./
RUN npm install --include=dev

# Copy source code
COPY . .

# Set environment variables for Vite to point to the backend service
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the React app with Vite
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
