# 🃏 Joke App - Full Stack with CI/CD & Kubernetes

This is a full-stack Joke Application with a React frontend and Node.js backend, containerized using Docker, deployed on a local Minikube Kubernetes cluster, and integrated with Azure DevOps for CI/CD.

---

## 📌 Features

- Backend API that returns a random joke (`/api/joke`)
- Frontend React app that displays the joke on page load/refresh
- Production-style Dockerfiles using multi-stage builds
- Kubernetes manifests for deployments, services, and ingress
- Self-hosted Azure DevOps agent for CI/CD pipelines
- Minikube for local Kubernetes cluster
- Ingress with `joke.local` domain using `/etc/hosts` mapping

---

## 📁 Project Structure

```
jokeAPP/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── k8s/
│       ├── deployment.yaml
│       └── service.yaml
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   └── k8s/
│       ├── deployment.yaml
│       └── service.yaml
└── k8s/
    └── ingress.yaml
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Docker & DockerHub account
- Node.js 18.x
- Azure DevOps account
- Minikube installed
- `kubectl` CLI configured
- Self-hosted Azure DevOps agent installed on your machine

---

## 🚀 Running Locally (for testing)

1. **Start Minikube**

   ```bash
   minikube start
   ```

2. **Enable Ingress**

   ```bash
   minikube addons enable ingress
   ```

3. **Update `/etc/hosts`**

   Get ingress IP:

   ```bash
   kubectl get svc -n ingress-nginx
   ```

   Map it:

   ```txt
   10.102.68.174  joke.local
   ```

4. **Apply Kubernetes Manifests**

   ```bash
   kubectl apply -f backend/k8s/
   kubectl apply -f frontend/k8s/
   kubectl apply -f k8s/ingress.yaml
   ```

5. **Access App**

   Visit: http://joke.local

---

## 📦 Docker Builds

### Frontend Multi-stage Dockerfile

```dockerfile
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
```

### Backend Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]
```

---

## 🔁 CI/CD with Azure DevOps

### ✅ Backend pipeline (`azure-pipelines-backend.yml`)

```yaml
trigger:
  branches:
    include:
      - main
      - prod

pool:
  name: Default

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'

  - script: |
      cd backend
      npm install

  - script: echo "Backend build done."

  - task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: 'backend'
      ArtifactName: 'backend-drop'
```

### ✅ Frontend pipeline (`azure-pipelines-frontend.yml`)

```yaml
trigger:
  branches:
    include:
      - main

pool:
  name: Default

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '18.x'

  - script: |
      cd frontend
      npm install
      npm run build

  - task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: 'frontend/build'
      ArtifactName: 'frontend-drop'
```

> These pipelines run on your **self-hosted agent**, which shares the environment with Minikube. So build + deployment is local and secure.

---

## 🔐 Security Policies

- Branch policies enforced on `main`, `dev`, and `prod`
- Docker images use latest LTS and Alpine-based production builds
- Node modules cached and locked using `npm ci`
- All code split across environments: dev, prod, main

---

## 🔧 Future Enhancements

- Use external API for jokes (like [official-joke-api](https://github.com/15Dkatz/official_joke_api))
- Add unit tests and GitHub Actions
- Push images to DockerHub and pull in Kubernetes
- Integrate Helm for templating

<<<<<<< HEAD
=======
---

>>>>>>> main
