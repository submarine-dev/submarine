variable "project_id" {
  type = string
}

variable "secrets" {
  type = map(string)
}

variable "service_accounts" {
  type = list(string)
}