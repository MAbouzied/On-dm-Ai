# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies and ca-certificates (also busts cache)
RUN apk update && apk add --no-cache ca-certificates
RUN npm install

# Copy source
COPY . .

# Set build-time env vars
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Verify and build
RUN echo "Building for $NEXT_PUBLIC_SITE_URL with API $NEXT_PUBLIC_API_URL"
RUN npm run build

# Production stage
FROM node:24-alpine AS production

WORKDIR /app

# Create non-root user and install ca-certificates
RUN apk add --no-cache ca-certificates && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set runtime env
ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
