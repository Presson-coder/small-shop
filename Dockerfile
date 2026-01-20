# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

RUN apk add --no-cache curl

# Copy files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs && \
    chown -R nodeuser:nodejs /app

USER nodeuser

# Expose the port the app listens on
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start the application
# Start the application with fallback logic
CMD ["sh", "-c", "if [ -f index.js ]; then echo 'Starting with index.js...' && node index.js; elif [ -f server.js ]; then echo 'Fallback to server.js...' && node server.js; elif [ -f app.js ]; then echo 'Fallback to app.js...' && node app.js; elif [ -f index.js ]; then echo 'Fallback to index.js...' && node index.js; else echo 'No suitable main file found!' && exit 1; fi"]
