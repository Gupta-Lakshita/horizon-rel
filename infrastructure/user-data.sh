#!/bin/bash

apt-get update -y

apt-get install -y docker.io docker-compose

systemctl start docker
systemctl enable docker

mkdir -p /opt/horizonrelevance

cat > /opt/horizonrelevance/docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    image: lakshitag/horizonrelevance:latest
    container_name: horizon
    restart: unless-stopped
    ports:
      - "80:3000"
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    container_name: horizon-redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data

volumes:
  redis-data:
EOF

cd /opt/horizonrelevance

docker-compose up -d