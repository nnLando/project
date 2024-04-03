resource "google_cloud_run_service" "capstone" {
  name     = "capstone"
  location = "us-central1"

  template {
    spec {
      containers {
        #image = "us-central1-docker.pkg.dev/frn-project/sandbox/capstone:latest"
        image = "us-central1-docker.pkg.dev/frn-project/quickstart-docker-repo/quickstart-image:tag1"
      }
    }
  }

  traffic {
    percent         = 50
    revision_name   = "capstone"
  }

  traffic {
    percent         = 50
    revision_name   = "capstone-1-00001-q7d"
  }
}

resource "google _cloud_run_service_iam_policy" "public" {
  service = google_cloud_run_service.capstone.name
  location = google_cloud_run_service.capstone.location
  policy_data =  dat.google_iam_policy.pub1 
}

data "google_iam_policy" "pub1" {
  binding {
    role = "roles/run.invoker"
    members = ["allUsers"]
  }
}