# 🚀 TeamSync – Real-Time 3‑Tier MERN Task Board

A production-ready, real‑time **Kanban-style task board** built with the **MERN stack** (MongoDB, Express, React, Node.js), **Socket.io WebSockets**, **Docker Compose multi-container deployment**, and **modern glassmorphism UI**.

## ✨ Features

- **⚡ Real-time collaboration** - Task updates sync instantly across all browser tabs/windows
- **🎨 Modern UI** - Glassmorphism cards, splash screen, priority badges, animations
- **🏗️ 3-Tier Architecture** - React (UI) → Node/Express+Socket.io (API) → MongoDB (Data)
- **🐳 Production Docker** - Multi-stage builds, Nginx reverse proxy, persistent volumes
- **☁️ Cloud Ready** - Deployed & tested on AWS EC2 (accessible via public IP)
- **📱 Fully Responsive** - Works on desktop, tablet, mobile

## 🎬 Live Demo Flow

1. Open `http://localhost` (or EC2 IP) in **2+ browser tabs**
2. Create task in Tab 1 → **Instantly appears** in Tab 2
3. Move task "To Do → In Progress" → **All tabs update live**
4. Edit priority/assignee → **Real-time sync everywhere**

## 🏗️ Architecture Overview
```
Browser (http://localhost:80 or EC2_IP)
↓ port mapping "80:80"
┌──────────────┐ Nginx (client container)
│ React UI │ ↗ Serve static files
│ Socket.io │ ↘ Proxy /api/* → server:5000
└──────┬───────┘ ↘ Proxy /socket.io/* → server:5000
↓ WebSocket & REST
┌──────────────┐
│ Node/Express │ ← Socket.io events (task:created, updated, deleted)
│ + Socket.io │
└──────┬───────┘
↓ mongodb://mongodb:27017
┌──────────────┐
│ MongoDB │ ← Persistent volume: mongo_data
└──────────────┘
```
## 📁 Project Structure

```
realtime-task-board/
├── docker-compose.yml # Orchestrates 3 containers
├── .env # Environment variables
├── README.md # This file!
│
├── client/ # Presentation Tier (React + Nginx)
│ ├── Dockerfile # Multi-stage: Vite → Nginx
│ ├── nginx.conf # Reverse proxy config
│ ├── package.json
│ ├── vite.config.js
│ ├── index.html
│ └── src/
│ ├── App.jsx # Main app + socket listeners
│ ├── index.css # Glassmorphism styles
│ ├── api.js # REST helpers
│ └── components/ # Splash, Header, Board, Cards...
│
└── server/ # Logic Tier (Node.js API)
├── Dockerfile # Production Node container
├── package.json
└── src/
├── index.js # Express + Socket.io server
├── socket.js # WebSocket event handlers
├── config/db.js # MongoDB connection
├── models/Task.js # Mongoose schema
└── routes/ # REST API endpoints
```

## 🐳 Quick Start (Local)

```
git clone https://github.com/Vercetti06/Docker-Practices/tree/main/realtime-task-board
cd realtime-task-board
docker compose up --build -d
```

🌐 Open: http://localhost in 2+ browser tabs
✅ Create tasks → Watch real-time magic!

### Useful Commands

```
docker compose ps # Check container status
docker compose logs -f # Follow all logs
docker compose logs -f server # Backend + Socket.io logs
docker compose down # Stop containers
docker compose down -v # Stop + delete database
```

## 🛠 Tech Stack

```
| Frontend | Backend | Infrastructure | Database |
|----------|---------|----------------|----------|
| React 18 | Node.js 20 | Docker Compose | MongoDB 7 |
| Vite | Express 4 | Nginx Proxy | Mongoose |
| Socket.io Client | Socket.io Server | Multi-stage | Persistent Vol |
| Glassmorphism CSS | CORS | Bridge Network |  |
```

## 🔍 Docker Networking
**Docker Compose AUTO-creates** `realtime-task-board_default` network:
```
Host:80 ──"ports:80:80"──→ client:80 (172.20.0.2) ← Nginx
↓ proxy_pass
server:5000 (172.20.0.3) ← API
↓ MONGO_URI
mongodb:27017 (172.20.0.4)
```

## 👨‍💻 Core Implementation

### Real-time Flow

```
// Client listens
socket.on("task:created", (task) => setTasks([task, ...prev]))

// Server broadcasts
io.to("board:main").emit("task:created", task)

// Mongo persists
await Task.create(payload)
```

### Task Schema
```
{
title: String, // Required
description: String,
status: "todo"|"in-progress"|"done",
priority: "low"|"medium"|"high",
assignee: String,
createdAt, updatedAt
}
```

## 🤔 Troubleshooting
```
| Issue | Solution |
|-------|----------|
| Port 80 busy | `sudo lsof -i :80` → `kill PID` |
| Build fails | `docker system prune -a -f` |
| No real-time | `docker compose logs server` (check "User connected") |
| Mongo error | `docker compose down -v && up --build` |
| EC2 404 | Security Group → HTTP(80) `0.0.0.0/0` |
```
