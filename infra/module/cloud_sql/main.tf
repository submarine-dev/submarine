resource "google_sql_database_instance" "main" {
  project = var.project_id
  name             = "${var.name}-instance"
  region           = var.location
  database_version = "POSTGRES_15"
  settings {
    tier = "db-f1-micro"
  }
  root_password = var.password

  deletion_protection  = true
}

resource "google_sql_database" "database_deletion_policy" {
  project = google_sql_database_instance.main.project
  name     = var.name
  instance = google_sql_database_instance.main.name
  deletion_policy = "ABANDON"
}

resource "google_project_iam_member" "name" {
  project = var.project_id
  role = "roles/cloudsql.client"
  member = var.service_accounts
}
