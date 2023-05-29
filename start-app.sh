#!/bin/bash

# Docker compose project name
PROJECT_NAME="tiny-url-app"

# Check if the Docker Compose network is already running, and if so, stop it
if [ $(docker network ls -q -f name=^/${PROJECT_NAME}_default$) ]; then
    echo "Docker Compose network with name ${PROJECT_NAME}_default is already running. Stopping it..."
    docker-compose down
fi

# Build the Docker images and start the containers
echo "Building Docker images and starting containers..."
docker-compose -p ${PROJECT_NAME} up --build

echo "Application is now running at http://localhost:3000 on your local machine"
