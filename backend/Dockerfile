
# Use the official Python image as the parent image
FROM python:3.9-slim-buster

RUN mkdir -p /home

WORKDIR /home

# Copy the current directory contents into the container at /app
COPY . /home

# Expose port 3000 for the Flask app to listen on
EXPOSE 3000

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r /home/requirements.txt

# Set the environment variable for Flask to run in production mode
ENV FLASK_ENV=production

# Run run.py when the container launches
CMD ["python", "/home/run.py"]
