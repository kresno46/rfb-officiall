# Use Node.js 22 Alpine as the base image for building
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --omit=dev && npm cache clean --force

# Copy the rest of the application code
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

# Install production dependencies only
RUN npm install --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./


# Expose the app port
EXPOSE 3000

# Set production environment mode
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]
