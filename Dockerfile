# ---- Base Stage ----
    FROM node:20-alpine AS base
    WORKDIR /app
    
    # ---- Build Stage ----
    FROM base AS builder
    RUN npm ci
    COPY . .
    # This ARG receives the public URL from the CI/CD workflow
    ARG NEXT_PUBLIC_AUTH_BASE_URL
    ENV NEXT_PUBLIC_AUTH_BASE_URL=${NEXT_PUBLIC_AUTH_BASE_URL}
    RUN npm run build
    
    # ---- Production Stage ----
    FROM base AS production
    ENV NODE_ENV=production
    # Assumes output: 'standalone' in next.config.js
    COPY --from=builder --chown=node:node /app/.next/standalone ./
    COPY --from=builder --chown=node:node /app/.next/static ./.next/static
    
    EXPOSE 3000
    CMD ["node", "server.js"]