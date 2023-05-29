#!/bin/bash

# Docker compose project name
PROJECT_NAME="tiny-url-app"

echo "Running tests in Docker container..."
docker-compose run web npm test

echo "Tests completed"
