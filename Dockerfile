# ========== Build stage ==========
FROM node:22-alpine AS builder
WORKDIR /app

# Tools buat native deps + compat glibc di Alpine
RUN apk add --no-cache python3 make g++ libc6-compat

# Pakai lockfile & stabilin npm
COPY package*.json ./
RUN npm i -g npm@10.8.1 \
  && npm ci --no-audit --no-fund

# Build app
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build


# ========== Runtime stage (production) ==========
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Compat glibc (sering dibutuhin binary prebuilt)
RUN apk add --no-cache libc6-compat

# >>> Tidak install dari internet lagi <<<
# Bawa node_modules hasil builder, lalu prune dev deps (offline)
COPY --from=builder /app/node_modules ./node_modules
RUN npm prune --omit=dev

# Bawa hasil build & file pendukung
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/package*.json ./

EXPOSE 3000
USER node
CMD ["npm", "start"]
