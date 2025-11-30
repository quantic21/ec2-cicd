# 🚀 Cost-Optimized CI/CD Pipeline with Docker, GitHub Actions & AWS EC2

This project demonstrates a **production-ready, cost-optimized CI/CD pipeline** using:

- **Docker** for containerized deployments  
- **GitHub Actions** for automated CI/CD  
- **AWS EC2 (t3.micro / t4g.micro)** as the deployment server  
- **GitHub Container Registry (GHCR)** for image storage  

The goal is to build, push, and deploy applications to EC2 **automatically on every push to `main`**, with minimal cost and maximum reliability.

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
