# =============================================
# VOCABMASTER AI — PRODUCTION DOCKERFILE
# =============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev

# ===== Production Image =====
FROM node:20-alpine

WORKDIR /app

# Copy server dependencies
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/package.json ./server/package.json

# Copy server source
COPY server/ ./server/

# Copy frontend files
COPY *.html *.js ./

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

CMD ["node", "server/server.js"]
