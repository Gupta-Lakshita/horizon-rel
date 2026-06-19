output "public_ip" {
  description = "Public IP of EC2 instance"
  value       = aws_instance.horizon.public_ip
}

output "public_dns" {
  description = "Public DNS of EC2 instance"
  value       = aws_instance.horizon.public_dns
}