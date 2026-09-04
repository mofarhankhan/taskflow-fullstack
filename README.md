kFlow – Full-Stack DevOps Project

TaskFlow is a full-stack task management application built with **React, Node.js, Express, and MySQL**, containerized using **Docker** and deployed on **AWS EC2** with a fully automated **CI/CD pipeline using GitHub Actions and Docker Hub**.

The project demonstrates how a modern full-stack application can be developed, containerized, deployed, and continuously delivered using DevOps practices.

---

## 🏗️ Architecture

```text
                    👨‍💻 Developer
                         │
                         │ git push
                         ▼
                    🐙 GitHub
                         │
                         ▼
               ⚙️ GitHub Actions
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       Frontend Docker       Backend Docker
          Build                  Build
              │                     │
              └──────────┬──────────┘
                         ▼
                    🐳 Docker Hub
                         │
                         ▼
                  🔐 SSH Deployment
                         │
                         ▼
                    ☁️ AWS EC2
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
          Frontend    Backend     MySQL
          Nginx       Node.js     Database
              │          │          │
              └──────────┴──────────┘
                         │
                         ▼
                 🌐 TaskFlow App
```

---

## ✨ Features

* 🔐 User Registration & Login
* 🔑 JWT-based Authentication
* 📝 Task Management
* 🗄️ MySQL Database
* ⚛️ React Frontend
* 🟢 Node.js + Express Backend
* 🐳 Dockerized Frontend & Backend
* 🐳 Docker Compose for Multi-Container Deployment
* ☁️ AWS EC2 Deployment
* 🌐 Elastic IP for stable application access
* 🔄 Automated CI/CD using GitHub Actions
* 📦 Docker Hub Image Registry
* 🔐 GitHub Secrets for secure credentials
* ❤️ Backend Health Check
* 🧹 Automatic cleanup of unused Docker images

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* Nginx

### Backend

* Node.js
* Express.js
* JWT
* bcryptjs
* CORS
* MySQL2

### Database

* MySQL 8.0

### DevOps & Cloud

* Linux / Ubuntu
* Git & GitHub
* Docker
* Docker Compose
* Docker Hub
* GitHub Actions
* AWS EC2
* SSH
* Elastic IP

---

## 📁 Project Structure

```text
taskflow-fullstack/
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
│
├── database/
│   └── schema.sql
│
├── .github/
│   └── workflows/
│       └── docker-ci.yml
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🐳 Dockerization

The application is divided into separate containers:

```text
Frontend Container
      │
      │ HTTP
      ▼
Backend Container
      │
      │ MySQL Connection
      ▼
MySQL Container
```

### Frontend

The React application is built using a multi-stage Docker build and served using Nginx.

```text
Node.js → React Build → Nginx
```

### Backend

The Node.js backend runs inside a lightweight Node.js Alpine container.

### Database

MySQL 8.0 runs as a separate container with persistent Docker volume storage.

---

# 🔄 CI/CD Pipeline

GitHub Actions automatically handles the build and deployment process.

Every push to the `main` branch triggers the pipeline.

```text
git push
   │
   ▼
GitHub Actions
   │
   ├── Checkout Code
   │
   ├── Setup Docker Buildx
   │
   ├── Login to Docker Hub
   │
   ├── Build Frontend Image
   │
   ├── Build Backend Image
   │
   ├── Push Images to Docker Hub
   │
   └── SSH into AWS EC2
            │
            ├── docker compose pull
            ├── docker compose up -d
            └── docker image prune -f
```

### Docker Image Tags

Images are pushed with both:

```text
<commit-sha>
latest
```

Example:

```text
mofarhankhan/taskflow-frontend:latest
mofarhankhan/taskflow-backend:latest
```

This provides traceability between application code and Docker images.

---

# ☁️ AWS Deployment

The application is deployed on an **AWS EC2 Ubuntu server**.

Docker Compose manages the application containers:

```text
AWS EC2
│
├── taskflow-frontend
│      └── Port 80
│
├── taskflow-backend
│      └── Port 5000
│
└── taskflow-mysql
       └── Internal Docker Network
```

The application uses an **AWS Elastic IP** so the public IP remains stable.

---

# 🔐 Security

Sensitive information is not stored directly in the Git repository.

The project uses:

* Environment variables
* `.gitignore`
* GitHub Actions Secrets
* Docker Hub Access Token
* SSH private key stored securely as a GitHub Secret
* JWT authentication

GitHub repository secrets used for CI/CD include:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
EC2_HOST
EC2_USERNAME
EC2_SSH_KEY
```

> Never commit `.env` files, passwords, API keys, access tokens, or SSH private keys to GitHub.

---

# ❤️ Health Check

The backend provides a health endpoint:

```text
GET /api/health
```

Example response:

```json
{
  "status": "healthy"
}
```

This verifies that the backend and database connection are working correctly.

---

# 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/mofarhankhan/taskflow-fullstack.git
cd taskflow-fullstack
```

### 2. Configure environment variables

Create the required environment configuration for the backend.

### 3. Run with Docker Compose

```bash
docker compose up -d
```

### 4. Check running containers

```bash
docker ps
```

### 5. Check backend health

```bash
curl http://localhost:5000/api/health
```

---

# 🐳 Docker Commands

Build images manually:

```bash
docker build -t taskflow-backend ./backend
docker build -t taskflow-frontend ./frontend
```

Run the complete application:

```bash
docker compose up -d
```

Stop the application:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

Pull latest images:

```bash
docker compose pull
```

---

# 📦 Docker Hub Images

### Frontend

`mofarhankhan/taskflow-frontend`

### Backend

`mofarhankhan/taskflow-backend`

---

# 📊 DevOps Skills Demonstrated

This project demonstrates practical experience with:

* Linux Administration
* Git & GitHub
* Docker
* Dockerfile
* Multi-stage Docker Builds
* Docker Compose
* Container Networking
* Persistent Volumes
* Docker Hub
* GitHub Actions
* CI/CD
* SSH Automation
* AWS EC2
* Elastic IP
* Environment Variables
* Secrets Management
* Application Health Checks
* Automated Deployment

---

# 🎯 Project Goals

The primary goal of this project was to understand and implement a complete DevOps workflow for a full-stack application.

From source code to production:

```text
Code
 ↓
Git
 ↓
GitHub
 ↓
GitHub Actions
 ↓
Docker Build
 ↓
Docker Hub
 ↓
AWS EC2
 ↓
Docker Compose
 ↓
Production Application
```

---

# 🔮 Future Improvements

Planned improvements include:

* ☸️ Kubernetes / K3s deployment
* 🔐 Kubernetes Secrets
* 🌐 Ingress
* 🔒 HTTPS with SSL/TLS
* 📈 Prometheus & Grafana monitoring
* 🩺 Container readiness & liveness probes
* 🔄 Rolling deployments
* 📦 Persistent Kubernetes volumes
* 🏗️ Infrastructure as Code with Terraform
* 🔑 AWS IAM best practices
* 🚀 Zero-downtime deployment

---

## 👨‍💻 Author

**Mohd Farhan Khan**

Aspiring DevOps Engineer passionate about Cloud, Automation, Containers, Kubernetes and CI/CD.

### 🔗 GitHub

https://github.com/mofarhankhan/taskflow-fullstack

