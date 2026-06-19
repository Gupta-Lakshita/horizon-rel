Implemented Infrastructure as Code (IaC) using Terraform to provision an AWS EC2 instance and automate deployment of the HorizonRelevance application.

The EC2 instance is bootstrapped using a Terraform-managed `user-data` script that installs Docker and Docker Compose, then deploys the application stack as a multi-container environment consisting of:

* HorizonRelevance Next.js application container
* Redis container for API rate limiting and spam protection

All infrastructure and deployment configuration is defined in code and committed to the repository, enabling repeatable cloud deployment through Terraform.

Artifacts added:

* Terraform configuration (`main.tf`, `outputs.tf`)
* Automated instance bootstrap (`user-data.sh`)
* Docker Compose-based deployment for application and Redis services
