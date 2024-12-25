terraform {
  backend "gcs" {
    bucket  = "submarine-terraform-bucket"
  }

  required_providers {
    google = {
      source = "hashicorp/google"
      version = "6.14.0"
    }
  }
}

locals {
  project_id="submarine-dev-439208"
}

provider "google" {
  project = local.project_id
  region  = var.location
}

resource "google_storage_bucket" "terraform-state-store" {
  name     = "submarine-terraform-bucket"
  location = var.location
  storage_class = "REGIONAL"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 5
    }
  }
}

module "api-registry" {
  source = "../../module/artifact_registry"
  project_id = local.project_id
  name = "submarine-api"
  location = var.location
}

module "service_account" {
  source       = "../../module/service_account"
  project_id = local.project_id
  name         = "submarine-api"
  display_name = "api-sa"
}

module "cloud_sql" {
  source = "../../module/cloud_sql"
  project_id = local.project_id
  name = "submarine-db"
  password = var.secrets["DB_PASSWORD"]
  location = var.location
  service_accounts = module.service_account.member
}

module "secret" {
  source = "../../module/secret"
  project_id = local.project_id
  secrets = merge(var.secrets,{
    "DB_HOST": module.cloud_sql.connection_name,
  })
  service_accounts = [
    module.service_account.member
  ]
}

locals {
  config = {
      "APP_ENV":    "development",
      "HOST":       "0.0.0.0",
      "DB_PORT":    "5432",
      "DB_USER":    "postgres",
      "DB_NAME":    "submarine",
      "DB_SSLMODE": "disable",
  }
}



