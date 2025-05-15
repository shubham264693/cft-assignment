FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy entire source code
COPY . .

# Copy your .env file into the container
COPY .env .env

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npx", "env-cmd", "-f", ".env", "node", "app.js"]