Implemented Infrastructure as Code (IaC) using Terraform to provision AWS EC2 infrastructure and automate deployment of the HorizonRelevance application.

Created Terraform configuration to provision and bootstrap an EC2 instance through a user-data script. The bootstrap process installs Docker and Docker Compose and deploys the HorizonRelevance application stack as containers.

The deployed stack consists of:

* HorizonRelevance Next.js application container
* Redis container used for API rate limiting

The infrastructure is fully defined in code and committed to the repository, allowing the environment to be recreated consistently through Terraform.

Additionally, implemented a GitHub Actions deployment workflow that automatically builds and publishes Docker images to Docker Hub and deploys updated application versions to the EC2 environment.

git push
    ↓
GitHub Actions
    ↓
Build Docker Image
    ↓
Push Docker Hub
    ↓
SSH to EC2
    ↓
docker-compose pull
    ↓
docker-compose up -d
    ↓
New Version Live