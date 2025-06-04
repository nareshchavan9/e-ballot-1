# Use Node as the base image
FROM node:23

# Set the working directory
WORKDIR /app

# Copy both Frontend and Backend folders into the container
COPY fontend /app/Frontend
COPY backend /app/Backend

# Install dependencies for both
RUN cd /app/Frontend && npm install
RUN cd /app/Backend && npm install 

# Install concurrently globally
RUN npm install -g concurrently nodemon

# Start both apps with concurrently
CMD ["concurrently", "cd /app/Frontend && npm run dev", "cd /app/Backend && npm run dev"]