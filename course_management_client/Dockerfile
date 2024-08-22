# Use an official node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the React app
RUN npm run build

# Use nginx to serve the app
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the port nginx runs on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
