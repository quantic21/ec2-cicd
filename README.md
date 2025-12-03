# 🚀 Cost-Optimized CI/CD Pipeline with Docker, GitHub Actions & AWS EC2

This project demonstrates a **production-ready, cost-optimized CI/CD pipeline** using:

- **Docker** for containerized deployments  
- **GitHub Actions** for automated CI/CD  
- **AWS EC2 (t4g.micro)** as the deployment server  
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
- 💰 **Cost optimized** (~₹600–750/month on AWS if on t3.micro)

---

# 🏗️ Architecture Overview

<img width="4340" height="606" alt="Untitled diagram-2025-12-02-132620" src="https://github.com/user-attachments/assets/2b75af22-e877-4e9b-aebe-0c9529db156f" />

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

