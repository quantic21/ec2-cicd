# 🚀 Cost-Optimized CI/CD Pipeline with Docker, GitHub Actions & AWS EC2

This project demonstrates a **production-ready, cost-optimized CI/CD pipeline** using:

- **Docker** for containerized deployments  
- **GitHub Actions** for automated CI/CD  
- **AWS EC2 (4g.micro)** as the deployment server  
- **GitHub Container Registry (GHCR)** for image storage  

The goal is to build, push, and deploy applications to EC2 **automatically on every push to `main`**, with minimal cost and maximum reliability.

---

## 🌐 Live Deployment

The app is deployed and running on AWS EC2:

👉 **Live Link:** http://3.90.136.170/

(Deployed automatically via GitHub Actions CI/CD)

---

# 📦 Features

- 🔄 Fully automated **CI + CD pipeline**
- 🐳 Dockerized application for consistent deployments
- 🔐 Secure SSH-based deployment to EC2
- 🚀 Auto-pull & restart container on EC2
- ♻️ `--restart always` ensures app stays up 24×7
- 💰 **Cost optimized** (~₹600–750/month on AWS)
- ☁️ No need for CodeDeploy, Elastic Beanstalk, Jenkins, or PM2

---

# 🧰 Components

| Component | Purpose |
|----------|---------|
| **GitHub Actions** | Builds Docker image, pushes to GHCR, deploys to EC2 |
| **GitHub Container Registry** | Stores Docker images securely |
| **AWS EC2 (Ubuntu)** | Runs the application container |
| **Docker Engine** | Executes the app inside a container |
| **SSH Key Authentication** | Secure connection for CD |

---


flowchart LR
  A["Developer pushes code to GitHub repo (main)"] --> B["GitHub Actions CI/CD Workflow (deploy.yml)"]
  B --> C["Build & Test Job
- Checkout code
- Build ARM64 Docker image
- Push to GHCR"]
  C --> D["GitHub Container Registry (ghcr.io)"]
  D --> E["Deploy Job
- SSH to EC2 using EC2_SSH_KEY
- docker pull image
- docker stop/rm myapp
- docker run -d myapp"]
  E --> F["AWS EC2 Instance (Ubuntu ARM64, Docker)"]
  F --> G["Running Container: myapp (port 3000 → 80)"]
  G --> H["User Browser
http://EC2-Public-IP/"]

  B -.-> I["GitHub Secrets
EC2_HOST
EC2_USER
EC2_SSH_KEY
GHCR_USERNAME
GHCR_TOKEN"]
  I -.-> E

