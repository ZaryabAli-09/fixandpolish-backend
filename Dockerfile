# Stage 1: Build Node.js application
FROM node:18 AS node-build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Build Python environment
FROM python:3.11-slim AS python-build

WORKDIR /app

# Copy the Node.js app from the previous stage
COPY --from=node-build /app /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Stage 3: Final stage
FROM python:3.11-slim

WORKDIR /app

# Copy the Node.js and Python environment from previous stages
COPY --from=node-build /app /app
COPY --from=python-build /app /app

# Install any additional dependencies if needed
# For example, you might need to install system dependencies
RUN apt-get update && \
    apt-get install -y build-essential

# Expose the port your app will run on
EXPOSE 4000

# Command to run your app
CMD ["node", "index.js"]
