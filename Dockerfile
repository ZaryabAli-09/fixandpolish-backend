# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Install Python and pip
RUN apt-get update && \
    apt-get install -y python python-pip

# Copy the rest of your project files to the working directory
COPY . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose the port that your application will run on
EXPOSE 4000

# Set the command to run your app
CMD ["node", "index.js"]
