
# Use the official Python image as the parent image
FROM python:3.9-slim-buster

# Copy the current directory contents into the container at /home
COPY . /home

# Copy requirements.txt file into the container at /home
COPY requirements.txt /home 

# Set the working directory to /home
WORKDIR /home

# Expose port 3000 for the Flask app to listen on
EXPOSE 3000

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Set the environment variable for Flask to run in production mode
ENV FLASK_ENV=production

# Run backendCrudService.py when the container launches
CMD ["python", "backendCrudService.py"]
