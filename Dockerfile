# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application code
COPY . .

# Expose port (optional, not needed for WhatsApp bot unless you add webhooks)
EXPOSE 3000

# Start the bot
CMD [ "node", "index.js" ]