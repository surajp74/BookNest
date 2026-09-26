# Kubernetes starter

This folder is intentionally left for the next phase.

Recommended design for the learning exercise:

- namespace `booknest-frontend`
- namespace `booknest-gateway`
- namespace `booknest-catalog`
- namespace `booknest-cart`
- namespace `booknest-order`
- namespace `booknest-user`

For each service we will later create:

- Deployment
- Service
- ConfigMap where needed
- Secret where needed
- resource requests/limits
- readiness/liveness probes
- HPA
- NetworkPolicy

Then we can move the same manifests into Azure DevOps and parameterize environment-specific values.
