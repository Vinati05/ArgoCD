terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

provider "local" {}

resource "local_file" "devops_file" {
  filename = "devops.txt"
  content  = "Infrastructure as Code using Terraform"
}