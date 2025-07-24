# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Install pnpm and serve globally
RUN npm install -g pnpm serve

# Create and change to the app directory.
WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including dev)
RUN pnpm install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

# Clear any existing build and rebuild
RUN rm -rf dist
RUN NODE_ENV=production pnpm run build

# Verify the build worked
RUN ls -la dist/

# Expose port
EXPOSE $PORT

# Serve the static files with serve
CMD serve -s dist -l $PORT