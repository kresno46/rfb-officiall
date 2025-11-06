# =========================
# Build stage (Alpine)
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Tools utk native deps + compat glibc (sering dibutuhin di Alpine)
RUN apk add --no-cache python3 make g++ libc6-compat

# Pakai lockfile & pin npm biar stabil di Alpine
COPY package*.json ./
RUN npm i -g npm@10.8.1 \
  && npm ci --no-audit --no-fund

# Copy source & build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build


# =========================
# Runtime stage (production)
# =========================
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Compat glibc untuk binary prebuilt
RUN apk add --no-cache libc6-compat

# Install hanya prod deps (tanpa cache clean yang bikin crash)
COPY package*.json ./
RUN npm i -g npm@10.8.1 \
  && npm ci --omit=dev --no-audit --no-fund

# Copy hasil build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Optional: kalau ada file config
COPY --from=builder /app/next.config.* ./

EXPOSE 3000
USER node
CMD ["npm", "start"]
