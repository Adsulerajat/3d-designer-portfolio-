# Builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (including dev deps needed for build)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy built artifacts
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/index.cjs"]
