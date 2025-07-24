# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Install pnpm and serve globally
RUN npm install -g pnpm serve

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

# Expose port
EXPOSE $PORT

# Serve the static files with serve
CMD serve -s dist -l $PORT