# syntax=docker/dockerfile:1.7

ARG NODE_IMAGE
FROM ${NODE_IMAGE} AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder
COPY package*.json ./
RUN npm ci --ignore-scripts --legacy-peer-deps
COPY . .

ARG NEXT_PUBLIC_AUTH_BASE_URL
ARG SOURCE_REVISION
ENV NEXT_PUBLIC_AUTH_BASE_URL=${NEXT_PUBLIC_AUTH_BASE_URL}
RUN npm run build

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

ARG SOURCE_REVISION
LABEL org.opencontainers.image.source="https://github.com/mettyeungv1/mettyeung-v1-ui" \
	org.opencontainers.image.revision=${SOURCE_REVISION}

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# The orchestrator supplies bounded noexec tmpfs mounts for this path and /tmp.
RUN mkdir -p /app/.next/cache && chown -R node:node /app/.next/cache

USER 1000:1000
EXPOSE 3000
CMD ["node", "server.js"]
