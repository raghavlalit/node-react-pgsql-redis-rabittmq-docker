FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (including devDependencies for Vite)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the development server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
