
# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /

# Copy the package.json and package-lock.json files to the container
COPY package*.json /

# Install dependencies
RUN npm install

# Install the BigQuery dependency
RUN npm install --save @google-cloud/bigquery

# Copy the rest of the application code to the container
ADD . /

# Build the application
RUN npm run build

# Expose port 80 for the container
EXPOSE 9000

# Start the application
CMD ["npm", "start"]
