terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Latest Ubuntu 24.04 LTS AMI

data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"] # Canonical

  filter {
    name = "name"

    values = [
      "ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"
    ]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Security Group

resource "aws_security_group" "web" {
  name        = "horizon-web"
  description = "Allow HTTP and SSH access"

  ingress {
    description = "HTTP"

    from_port = 80
    to_port   = 80
    protocol  = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"

    from_port = 22
    to_port   = 22
    protocol  = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0

    protocol = "-1"

    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "horizon-web-sg"
    Environment = "dev"
    Project     = "HorizonRelevance"
  }
}

# EC2 Instance

resource "aws_instance" "horizon" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  key_name = "horizon-key"

  vpc_security_group_ids = [
    aws_security_group.web.id
  ]

  user_data = file("${path.module}/user-data.sh")

  tags = {
    Name        = "horizon-relevance"
    Environment = "dev"
    Project     = "HorizonRelevance"
  }
}