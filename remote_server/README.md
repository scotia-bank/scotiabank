# 🚀 SARAH-OS: Remote PHP Server Setup Guide

This directory contains the lightweight PHP backend required to handle bulletproof email delivery and secure landing pages for your deployment.

## 📋 Prerequisites

To successfully deploy and use this remote server, you will need:
1. **GitHub Account**: To host your code repository.
2. **Render Account**: For free, high-reputation PHP hosting.
3. **WSL (Windows Subsystem for Linux)**: For local testing and Cloudflare tunnel setup (if not using Render).

---

## 🛠️ Option 1: Fast Deployment (GitHub + Render)

This is the recommended method for 24/7 uptime and high email deliverability.

### 1. Create a Repository
1. Log in to **GitHub**.
2. Create a new **Private** repository (e.g., `sarah-remote-server`).
3. Upload the files from this `remote_server` folder to that repository.
   - Alternatively, fork a template if provided.

### 2. Deploy to Render
1. Log in to **Render.com**.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub account and select your `sarah-remote-server` repository.
4. **Settings:**
   - **Runtime**: `PHP`
   - **Build Command**: (Leave blank)
   - **Start Command**: (Leave blank - Render handles PHP automatically)
5. Click **Create Web Service**.
6. Once deployed, Render will give you a URL like `https://sarah-remote.onrender.com`.

---

## 💻 Option 2: Local Deployment (WSL + Cloudflared)

Use this if you want to run the server from your own computer using a Cloudflare tunnel.

### 1. Install WSL on Windows
1. Open PowerShell as Administrator.
2. Run: `wsl --install`
3. Restart your computer if prompted.
4. Set up your Ubuntu/Debian username and password.

### 2. Install PHP in WSL
Inside your WSL terminal, run:
```bash
sudo apt update
sudo apt install php php-curl php-json php-mbstring -y
```

### 3. Start the PHP Server
Navigate to your project directory in WSL and run:
```bash
php -S 0.0.0.0:8000
```

### 4. Setup Cloudflared Tunnel
To get a public URL for your local server:
1. Download `cloudflared` in WSL:
   ```bash
   curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
   chmod +x cloudflared
   ```
2. Start the tunnel:
   ```bash
   ./cloudflared tunnel --url http://localhost:8000
   ```
3. Copy the URL provided (e.g., `https://random-words.trycloudflare.com`).

---

## 🔗 Final Step: Connect to SARAH-OS

Once you have your URL (from Render or Cloudflare):

1. Log in to your SARAH-OS **Admin Panel** (PIN: `PROJECTSARAH`).
2. Go to **Settings -> Core**.
3. Find the **Landing Action URL** (baseActionUrl) field.
4. Paste your URL here (e.g., `https://sarah-remote.onrender.com`).
5. **Save Settings**.

**✅ Test it:** Go to the Email Dispatcher tool and try sending a test transfer. The system will now use your remote PHP server to send the mail!
