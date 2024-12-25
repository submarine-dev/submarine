variable "location" {
  type = string
  default = "asia-northeast1"
}

variable "name" {
  type = string
}

variable "machine-tier" {
  type = string
  default = "db-f1-micro"
}

variable "project_id" {
  type = string
}

variable "password" {
  type = string
}

variable "service_accounts" {
  type = string
}