# Use a base image that includes Node.js
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install Python and pip3
RUN apt-get update && apt-get install -y python3 python3-pip

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Install Node.js dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 4000

# Command to start your app
CMD ["node", "index.js"]
