# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Install pnpm
RUN npm install -g pnpm

# Create and change to the app directory.
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install packages
RUN pnpm install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

# Build the app.
RUN pnpm run build

# Expose port (Railway usa el puerto que definas en PORT env var, por defecto 3000)
EXPOSE 4321

# Serve the app
CMD ["pnpm", "run", "start"]