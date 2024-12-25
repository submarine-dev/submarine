resource "google_storage_bucket" "main" {
  name          = var.name
  location      = var.location
  force_destroy = true

  uniform_bucket_level_access = true
}

data "google_iam_policy" "admin" {
  binding {
    role = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
  }
}

resource "google_storage_bucket_iam_policy" "policy" {
  bucket = google_storage_bucket.main.name
  policy_data = data.google_iam_policy.admin.policy_data
}