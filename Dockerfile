# Use Node.js 22 Alpine as the base image for building
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for building native modules
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including devDependencies, needed for build)
RUN npm install

# Copy all application code
COPY . .

# Build the application
RUN npm run build


# -------------------------
# Production runtime stage
# -------------------------
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Expose app port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]
