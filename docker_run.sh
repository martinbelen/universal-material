#!/bin/bash

echo "Geting dependencies......"
npm install
echo "Building assets......"
npm run build
echo "Creating docker instance......"
docker-compose -f config/docker/docker-compose-local.yml down
docker-compose -f config/docker/docker-compose-local.yml build
docker-compose -f config/docker/docker-compose-local.yml up