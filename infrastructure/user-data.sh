#!/bin/bash

apt-get update -y

apt-get install -y docker.io

systemctl start docker
systemctl enable docker

docker pull lakshitag/horizonrelevance:latest

docker run -d \
--restart unless-stopped \
-p 80:3000 \
--name horizon \
lakshitag/horizonrelevance:latest