# Microservices Architecture Design for MVP Instagram-like App

## At-a-Glance Summary

| Section | Highlights |
|--------|------------|
| **Problem & Assumptions** | MVP social media platform, team of 6 devs + 3 QAs, 3 quarters build time + 1 quarter for QA/beta |
| **Core Services (in-house)** | Feed, Content, Interaction — all built with Node.js + NestJS for consistency |
| **Third-Party Services** | Auth0 (auth), Twilio Conversations (chat), OneSignal (notifications), Amplitude (analytics) |
| **Unified Stack Rationale** | TypeScript/NestJS across services reduces context switching, accelerates onboarding, enables shared tooling |
| **Infrastructure** | Managed Kubernetes (GKE/EKS), NGINX Ingress, ArgoCD, Prometheus/Grafana, ExternalDNS, cert-manager |
| **Design Drivers** | Prioritize speed, compliance (GDPR/CCPA), ease of migration, and developer experience over cost |

---

## Introduction
This document outlines the architecture for a microservices-based MVP Instagram-like mobile application. It aims to balance time-to-market, scalability, compliance, and ease of development.

The intended audience includes Engineering, Product, QA, and Project teams.

---

## Problem Statement
Build an MVP social platform that supports:
- Photo/video upload with processing
- Personalized feeds
- Likes and comments
- Real-time chat
- Push/email notifications
- Basic usage analytics

Time constraints:
- **3 quarters for development**
- **1 quarter for stabilization, bug fixing, beta testing**

---

## Assumptions
- **Team size**: 6 developers, 3 QAs
- **Target users**: Global (NA + EU — GDPR/CCPA compliance required)
- **Cloud-agnostic** but favoring managed services
- **Budget**: Small startup scale (focus on fast launch, revisit cost post-MVP)
- **Architecture must support future migration of third-party services in-house**

---

## Core Services (Developed In-House)

To reduce development friction and improve team agility, all in-house services will be built using **Node.js + TypeScript with the NestJS framework**. This decision was driven by the need to maximize team efficiency, ensure ease of knowledge sharing, and reduce context switching. By standardizing the language and framework, developers can move seamlessly between services, pair program more effectively, and reuse tooling and patterns. This also simplifies onboarding, CI/CD pipeline maintenance, and local development setups.

Rather than introducing multiple languages (e.g., Go for performance or Python for media handling), the chosen stack offers a strong middle ground—balancing productivity, ecosystem maturity, and acceptable runtime performance for the current scale. Specialized needs like video transcoding or analytics aggregation are either outsourced or encapsulated in async worker patterns, ensuring the team can focus on core feature delivery.

A shared scaffolding project is planned to accelerate service creation, featuring reusable boilerplate including:
- Health checks
- Logging and telemetry
- Request validation
- Error handling
- Config and environment management
- CI-ready Dockerfiles and Helm charts

This scaffolding helps enforce consistency across services, improves code quality, and supports faster onboarding of new engineers.

### Summary of Each Core Service

#### Feed Service
- **Language**: TypeScript (NestJS)
- **Purpose**: Serve personalized user feed (rule-based initially)
- **Rationale**: High read-load, needs low-latency; Go considered, but NestJS chosen for unified stack
- **Data**: Cached in Redis, backed by PostgreSQL
- **Deployment**: K8s, HPA-enabled

#### Content Service
- **Language**: TypeScript (NestJS)
- **Purpose**: Media upload, FFmpeg/sharp processing, S3 storage
- **Rationale**: Node.js handles I/O-heavy flows well; using same stack reduces dev friction
- **Queue**: Async processing via Pub/Sub (GCP) or SQS (AWS)
- **Deployment**: Stateless upload pods + worker pods

#### Interaction Service
- **Language**: TypeScript (NestJS)
- **Purpose**: Likes, comments, follows
- **Rationale**: Logic-heavy, needs structured service; NestJS chosen for modularity
- **Data**: PostgreSQL primary, Redis for hot counts
- **Events**: Emits to analytics/notification via pub/sub

---

## Third-Party Services & Trade-offs

To minimize time-to-market, we opted to integrate high-leverage third-party services for non-core systems like authentication, messaging, notifications, and analytics. Each was selected based on three criteria: rapid integration, long-term extensibility, and ease of migration. Cost was evaluated but deprioritized in favor of accelerating development.

Where possible, we chose tools that use open standards (e.g., OAuth2, REST) and allow data export or SDK replacement. Services that offered generous free tiers or pay-as-you-go pricing were favored to keep initial costs low. Migration strategies were considered to ensure we could eventually bring functionality in-house if needed.

### Auth0 (Authentication)
- **Chosen for**: Fastest secure OAuth/OIDC setup, broad protocol support, excellent developer experience
- **Pros**: Supports social login, MFA, RBAC; highly customizable; quick to integrate using SDKs and hosted UI
- **Cons**: Costs can grow significantly after 7,500 monthly active users (free tier cap); pricing starts at $35/month for 500 MAU
- **Alternative**: Cognito — less expensive but harder to configure and customize
- **Migration**: Moderate — exports via API available, but password re-authentication may be required when switching providers

### Twilio Conversations (Messaging)
- **Chosen for**: Affordable real-time messaging API that scales with user base
- **Pros**: Clean REST API and SDKs, pricing based on active users ($0.05/user/month); flexible channel support
- **Cons**: No UI components provided, so client-side chat interfaces must be built in-house
- **Alternative**: Sendbird — provides built-in UI kits and analytics, but starts at ~$399/month for 5k MAU
- **Migration**: Medium — Data export supported, but client-side logic must be rewritten if switching

### OneSignal (Push Notifications)
- **Chosen for**: Fastest way to implement cross-platform push notifications with targeting and scheduling
- **Pros**: Generous free tier (10k web push subscribers), full GDPR tooling, easy dashboard management for QA/product
- **Cons**: Price grows with mobile MAUs (e.g., \$39/month at 10k subs, $69 at 20k); dependency on third-party infra
- **Alternative**: Firebase Cloud Messaging (free, but requires building targeting logic manually)
- **Migration**: Low — Device tokens are portable, backend integration easy to rewire

### Amplitude (Analytics)
- **Chosen for**: Easy-to-use product analytics with advanced cohorting, retention tracking, and experiments
- **Pros**: Startup-friendly pricing (free up to 50k monthly tracked users), supports GDPR and EU data residency, visual dashboard tools for PMs
- **Cons**: Costs rise with volume ($0.00028/event after free tier); usage must be carefully tracked
- **Alternative**: Mixpanel (similar pricing/features), PostHog (self-hostable)
- **Migration**: Low — Standardized events, export API support, compatible with Segment or internal pipelines

---

## Infrastructure Design

To support rapid development and deployment, the infrastructure is designed around managed Kubernetes using either GKE Autopilot or AWS EKS, favoring ease of use and scalability over bare-metal control. These platforms were chosen after evaluating self-managed Kubernetes (which adds operational overhead) and serverless-only solutions (which limit control and observability).

Networking is handled via NGINX Ingress Controller, which provides robust routing and TLS termination with support for JWT middleware. cert-manager automates TLS certificate issuance using Let’s Encrypt, while ExternalDNS integrates directly with Route53 or Cloud DNS to sync domain records with Kubernetes Ingress resources. GitOps was selected as the deployment model to ensure declarative, auditable, and self-healing environments, implemented using ArgoCD alongside GitHub Actions for CI.

For observability, the Prometheus + Grafana stack enables time-series metrics and custom alerts, while Loki and Fluent Bit provide log aggregation and filtering. OpenTelemetry and Jaeger were chosen to support distributed tracing across services.

Secrets are encrypted at rest using Sealed Secrets and stored in version-controlled manifests. As a fallback, cloud-native secret managers from AWS or GCP provide secure, role-based access in staging and production environments. PostgreSQL and Redis are provisioned as managed services to reduce maintenance burden, and media and event storage is handled via S3/GCS and Pub/Sub/SQS respectively.

### Kubernetes (Managed)
- **Cluster**: GKE Autopilot or EKS
- **Autoscaling**: Cluster Autoscaler + HPA (CPU-based, future: queue-based)

### Networking & Gateway
- **Ingress**: NGINX Ingress Controller via Helm
- **TLS**: cert-manager + Let’s Encrypt
- **DNS**: ExternalDNS + Cloud DNS (or Route53)
- **Auth**: JWT validation middleware (OIDC)

### Deployment
- GitHub Actions for CI
- ArgoCD for GitOps-based CD
- Shared Helm templates

### Secrets & Config
- Sealed Secrets + `.env` per environment
- Cloud storage for secrets fallback (AWS Secrets Manager / GCP Secret Manager)

### Observability
- **Metrics**: Prometheus + Grafana
- **Logs**: Fluent Bit + Grafana Loki
- **Tracing**: OpenTelemetry + Jaeger

### Data Stores
- PostgreSQL (Cloud SQL / RDS)
- Redis (managed cache)
- S3/GCS for media
- Pub/Sub or SQS for events

---

## Follow-up Considerations

### Migration Strategy & Scalability
While the MVP relies on third-party tools to accelerate delivery, each selected service allows future migration. For example, Twilio Conversations can be replaced by a self-hosted WebSocket server, and analytics can shift from Amplitude to a warehouse-based solution like PostHog or custom dashboards. Open standards (e.g., OAuth2, REST APIs) ensure flexibility.

### Rollout Planning
We recommend a phased delivery approach: start with content and user services, then layer in feed, interaction, and third-party integrations. Staging environments should match production infrastructure for accurate QA. A one-quarter stabilization window is reserved for performance tuning, testing, and iteration.

### Security Considerations
Key areas include secure token storage, rate limiting, TLS encryption, automated vulnerability scans, and audit logging. Secrets will be rotated periodically and access scoped by role. Infrastructure-level firewall rules and IAM policies will be enforced per environment.

### API Design & Versioning
RESTful endpoints will follow standard naming and be documented using OpenAPI/Swagger. APIs will be prefixed with version indicators (e.g., `/v1/feed`). Guidelines for backward compatibility and deprecation will be established early to avoid disruption.

### Monitoring & Alerting
Grafana dashboards will track system health, latency, error rates, and resource usage. Alerts for key metrics (e.g., CPU saturation, 5xx errors, queue lag) will be routed to Slack/email. Health checks will trigger automated pod restarts if failures persist.

### Terminology & Glossary
To support cross-functional collaboration, we suggest adding a glossary of terms like "feed item," "follower count," "MAU," and "interaction event." This helps align vocabulary across Product, QA, and Engineering teams.

---

## Final Thoughts
This architecture is designed to maximize delivery speed, reduce DevOps friction, and ensure compliance in high-risk regions. By combining a unified developer stack with proven third-party services and a low-ops infrastructure strategy, the team can focus on delivering core product value without being buried in platform overhead.

Planned migration strategies ensure long-term flexibility while keeping MVP scope realistic.

Next step: Diagram this system, build service templates, and begin phased rollout.

