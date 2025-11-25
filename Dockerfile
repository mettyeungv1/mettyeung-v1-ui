# ---- Base Stage ----
    FROM node:20-alpine AS base
    WORKDIR /app

    # ---- Build Stage ----
    FROM base AS builder

    # Copy dependency files first (important for npm ci)
    COPY package*.json ./

    # Install dependencies
    RUN npm ci --legacy-peer-deps

    # Copy the rest of the project
    COPY . .

    # This ARG receives the public URL from the CI/CD workflow
    ARG NEXT_PUBLIC_AUTH_BASE_URL
    ENV NEXT_PUBLIC_AUTH_BASE_URL=${NEXT_PUBLIC_AUTH_BASE_URL}

    # Build the Next.js app
    RUN npm run build

    # ---- Production Stage ----
    FROM base AS production

    # Use non-root user for security
    USER node
    WORKDIR /app

    ENV NODE_ENV=production
    ENV PORT=3000
    
    # Assumes next.config.js has: output: "standalone"
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static

    # ❗ FIX: Add this line to copy your images and other public assets right here
    COPY --from=builder /app/public ./public

    EXPOSE 3000
    CMD ["node", "server.js"]
