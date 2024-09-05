# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Setup the production environment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the build output
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 3002

# Run the application
CMD ["node", "dist/main.js"]
