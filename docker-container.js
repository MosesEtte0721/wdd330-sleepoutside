# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files into container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
``