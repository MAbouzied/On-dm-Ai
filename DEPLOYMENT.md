# On-DM Deployment Documentation

## 🚀 Live URLs
- **Frontend (Staging)**: https://staging.on-dm.com
- **Backend API**: https://api.on-dm.com
- **Health Check**: https://api.on-dm.com/health

---

## 📦 Stack
- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Backend**: Express.js + TypeScript + Prisma ORM
- **Database**: MySQL 8 (Docker container)
- **Ports**: 
  - Frontend: 3001 (host) → 3000 (container)
  - Backend: 4001 (host) → 4000 (container)
- **SSL**: Let's Encrypt (auto-renewal enabled)

---

## 🔐 Environment Variables (.env)

```bash
# MySQL Database
MYSQL_ROOT_PASSWORD=ondm_root_secure_2024
MYSQL_DATABASE=ondm
MYSQL_USER=ondm
MYSQL_PASSWORD=ondm_secure_pass_2024

# JWT Secret (keep this secure!)
JWT_SECRET=LT9408uGATKoi9kMgb+OXjrY9D3ZFUJdPSGUT1zoIts=

# Frontend URL (CORS)
FRONTEND_URL=https://on-dm.com

# API Base URL
API_BASE_URL=https://api.on-dm.com
```

---

## 🌐 Frontend Environment Variables

Add these to your Hostinger frontend:

```bash
NEXT_PUBLIC_API_URL=https://api.on-dm.com
```

Or if your frontend uses different variable names:

```bash
API_BASE_URL=https://api.on-dm.com
NEXT_PUBLIC_BACKEND_URL=https://api.on-dm.com
```

---

## 📋 Common Commands

### View Container Status
```bash
cd /home/abaq/on-dm/On-dm-Ai
docker compose ps
```

### View Logs
```bash
# Frontend logs
docker logs ondm-frontend -f --tail 100

# Backend logs
docker logs ondm-backend -f --tail 100

# MySQL logs
docker logs ondm-mysql -f --tail 100
```

### Restart Services
```bash
cd /home/abaq/on-dm/On-dm-Ai
docker compose restart
```

### Stop Services
```bash
cd /home/abaq/on-dm/On-dm-Ai
docker compose down
```

### Start Services
```bash
cd /home/abaq/on-dm/On-dm-Ai
docker compose up -d
```

---

## 🔄 Update/Pull Code

### Pull Latest Code and Rebuild All
```bash
cd /home/abaq/on-dm/On-dm-Ai

# Pull latest code
git pull origin main

# Rebuild and restart all
docker compose build
docker compose up -d

# Apply database migrations (if any)
docker exec ondm-backend npx prisma db push
```

### Update Frontend Only
```bash
cd /home/abaq/on-dm/On-dm-Ai
git pull origin main
docker compose build ondm-frontend
docker compose up -d ondm-frontend
```

### Update Backend Only
```bash
cd /home/abaq/on-dm/On-dm-Ai
git pull origin main
docker compose build ondm-backend
docker compose up -d ondm-backend
docker exec ondm-backend npx prisma db push
```

---

## 🗄️ Database Commands

### Access MySQL Shell
```bash
docker exec -it ondm-mysql mysql -u ondm -p
# Password: ondm_secure_pass_2024
```

### Run Prisma Migrations
```bash
docker exec ondm-backend npx prisma db push
```

### Re-seed Database
```bash
docker exec ondm-backend npx tsx prisma/seed.ts
```

### Prisma Studio (Database GUI)
```bash
# Run from host (not inside container)
cd /home/abaq/on-dm/On-dm-Ai/backend
DATABASE_URL="mysql://ondm:ondm_secure_pass_2024@localhost:3306/ondm" npx prisma studio
# Note: This requires MySQL port to be exposed. Currently it's internal only.
```

---

## 🔧 Nginx Configuration

Config file: `/etc/nginx/sites-enabled/on-dm-api.conf`

### Test Nginx Config
```bash
sudo nginx -t
```

### Reload Nginx
```bash
sudo systemctl reload nginx
```

---

## 🔒 SSL Certificate

### Check Certificate Status
```bash
sudo certbot certificates
```

### Renew Certificate (auto-renewal is enabled)
```bash
sudo certbot renew --dry-run
```

---

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker logs ondm-backend

# Check if port is in use
lsof -i :4001
```

### Database connection issues
```bash
# Check MySQL is running
docker ps | grep ondm-mysql

# Test connection
docker exec ondm-backend npx prisma db push
```

### API not responding
```bash
# Check container health
docker ps --filter "name=ondm"

# Test directly
curl http://localhost:4001/health
```

---

## 📁 File Locations

| File | Path |
|------|------|
| Project Root | `/home/abaq/on-dm/On-dm-Ai` |
| Frontend Code | `/home/abaq/on-dm/On-dm-Ai/frontend` |
| Backend Code | `/home/abaq/on-dm/On-dm-Ai/backend` |
| Docker Compose | `/home/abaq/on-dm/On-dm-Ai/docker-compose.yml` |
| Environment | `/home/abaq/on-dm/On-dm-Ai/.env` |
| Frontend Dockerfile | `/home/abaq/on-dm/On-dm-Ai/frontend/Dockerfile` |
| Backend Dockerfile | `/home/abaq/on-dm/On-dm-Ai/backend/Dockerfile` |
| Nginx API Config | `/etc/nginx/sites-enabled/on-dm-api.conf` |
| Nginx Staging Config | `/etc/nginx/sites-enabled/on-dm-staging.conf` |
| SSL Certs (API) | `/etc/letsencrypt/live/api.on-dm.com/` |
| SSL Certs (Staging) | `/etc/letsencrypt/live/staging.on-dm.com/` |

---

## 🔑 Admin Login

- **Email**: admin@ondm.com
- **Password**: admin123

⚠️ **Change this password in production!**

---

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /api/public/services` | Get all services |
| `GET /api/public/projects` | Get all projects |
| `GET /api/public/blog` | Get blog posts |
| `POST /api/auth/login` | Admin login |
| `GET /api/services` | Admin: manage services |
| `GET /api/projects` | Admin: manage projects |
| `POST /api/upload` | Admin: upload files |

---

## ⚡ Quick Reference

```bash
# Status
docker compose ps

# Logs
docker logs ondm-backend -f

# Restart
docker compose restart

# Update code
git pull && docker compose build ondm-backend && docker compose up -d ondm-backend

# Apply DB changes
docker exec ondm-backend npx prisma db push
```
