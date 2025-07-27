FROM node:20-alpine

WORKDIR /app

# Copy only package files first to cache dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Generate Prisma client for linux-musl
RUN npx prisma generate

EXPOSE 5000
CMD ["npm", "run", "dev"]