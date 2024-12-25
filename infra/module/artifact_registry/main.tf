resource "google_artifact_registry_repository" "main" {
  project = var.project_id
  location      = var.location
  repository_id = var.name
  description   = "${var.name}'s docker registry"
  format        = "DOCKER"
  cleanup_policy_dry_run = false

  docker_config {
    immutable_tags = true
  }
}