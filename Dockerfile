# Base image - Python 3.12 slim (lightweight Linux + Python)
FROM python:3.12-slim

# Set working directory inside the container
WORKDIR /app

# Copy all project files into the container
COPY . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Set a dummy secret key for build time only (collectstatic needs it)
ENV SECRET_KEY=dummy-secret-key-for-build

# Collect static files into staticfiles/ folder
RUN python website/manage.py collectstatic --noinput

# Start Gunicorn production server on port 8000
CMD ["gunicorn", "website.wsgi:application", "--bind", "0.0.0.0:8000", "--chdir", "/app/website"]