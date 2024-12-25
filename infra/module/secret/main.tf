resource "google_secret_manager_secret" "secret" {
  project = var.project_id
  for_each = var.secrets
  secret_id = each.key

  replication {
    auto {}
  }
}


resource "google_secret_manager_secret_version" "main" {
  for_each = var.secrets

  secret = google_secret_manager_secret.secret[each.key].id
  secret_data = each.value
  enabled = true
}

resource "google_secret_manager_secret_iam_policy" "policy" {
  for_each = var.secrets
  
  project = google_secret_manager_secret.secret[each.key].project
  secret_id = google_secret_manager_secret.secret[each.key].id
  policy_data = data.google_iam_policy.admin.policy_data
}

data "google_iam_policy" "admin" {
  binding {
    role = "roles/secretmanager.secretAccessor"
    members = var.service_accounts
  }
}

