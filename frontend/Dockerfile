# Dockerfile

# Step 1: Use Node.js to build the React application
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the React application
RUN npm run build

# Step 2: Use Nginx to serve the built files
FROM nginx:alpine

# Copy the build output from the previous step to the Nginx default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
