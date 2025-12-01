# Stage 1: Build the Next.js application (using a node base image)
FROM node:20-alpine AS builder

# Set the working directory for all subsequent commands
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# This is done separately to leverage Docker caching for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
# 'output: "standalone"' makes the build output highly optimized for Docker
# by putting all necessary files (including node_modules) into a single folder.
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Create the final, lean production image
# Use a node base image for running the app
FROM node:20-alpine AS runner

# Set the environment variable for standalone output
ENV NODE_ENV production
ENV PORT 3000

# Next.js standalone output copies all required dependencies (node_modules)
# into the .next/standalone folder, making the build image much smaller.
WORKDIR /app

# Copy the standalone output from the builder stage
# /app/.next/standalone -> /app
COPY --from=builder /app/.next/standalone /app/.next/standalone
# Copy the static assets and public directory
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Set the port the Next.js app will listen on
EXPOSE 3000

# Start the Next.js production server
# The entry point is the node server created in the standalone build output
CMD ["node", ".next/standalone/server.js"]