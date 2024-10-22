variable "aws_region" {
  default = "eu-central-1"
}

variable "app_name" {
  default = "cupidonchik"
}

variable "s3_bucket_frontend" {
  default = "cupidonchik-frontend"
}

variable "mongodb_uri" {
  description = "MongoDB connection URI"
}

variable "sentry_dsn" {
  description = "Sentry DSN"
}

variable "aws_profile" {
  default = "default"
}
