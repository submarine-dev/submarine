resource "google_cloud_run_v2_service" "main" {
  project = local.project_id
  name                = "submarine-api-dev"
  location            = var.location
  deletion_protection = false
  ingress             = "INGRESS_TRAFFIC_ALL"

  template {
    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [module.cloud_sql.connection_name]
      }
    }

    service_account = module.service_account.email

    containers {
      image = "${var.location}-docker.pkg.dev/${local.project_id}/${module.api-registry.id}/api:0"

      resources {
        limits = {
          cpu    = "1"
          memory = "1Gi"
        }
      }

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }

      dynamic "env" {
        for_each = merge(var.secrets,{
          "DB_HOST": module.cloud_sql.connection_name,
        })

        content {
          name = env.key
          value_source {
            secret_key_ref {
              secret  = env.key
              version = "latest"
            }
          }
        }
      }

      dynamic "env" {
        for_each = local.config

        content {
          name  = env.key
          value = env.value
        }
      }
    }
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_v2_service.main.location
  project  = google_cloud_run_v2_service.main.project
  service  = google_cloud_run_v2_service.main.name

  policy_data = data.google_iam_policy.noauth.policy_data
}