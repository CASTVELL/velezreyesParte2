# Use the official Python image as the parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /

# Copy requirements.txt file into the container at /app
COPY requirements.txt /

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
ADD . /

# Expose port 3000 for the Flask app to listen on
EXPOSE 3000

# Run backendCrudService.py when the container launches
CMD ["python", "backendCrudService.py"]