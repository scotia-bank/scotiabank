# 🚀 SARAH-OS: Complete Remote Server Setup Guide

This guide provides exhaustive instructions on how to set up your remote PHP server for secure email delivery and landing page hosting. You can choose between **Render (Cloud Hosting)** or **WSL + Cloudflare (Local Hosting)**.

---

## 🏗️ 1. Getting Started: The GitHub Repo
Regardless of which hosting method you choose, hosting your code on GitHub makes management easier.

1.  **Create a GitHub Account**: If you don't have one, sign up at [github.com](https://github.com).
2.  **Create a New Repository**:
    *   Click the **+** icon in the top right and select **New repository**.
    *   Name it `sarah-remote-server`.
    *   Set it to **Private** (recommended).
    *   Click **Create repository**.
3.  **Upload the Files**:
    *   In your AI Studio editor, find the `remote_server` folder.
    *   Download the files (or the `SARAH-OS-Remote-Server.zip` payload if you used the download button).
    *   Upload these files directly to your new GitHub repository.

---

## 🌐 2. Option A: Hosting on Render (Recommended)
Render is the easiest way to get a professional `https://` URL that stays online 24/7.

1.  **Sign Up for Render**: Go to [render.com](https://render.com) and sign up (connect your GitHub account for easy access).
2.  **Create a New Web Service**:
    *   Click **New +** and select **Web Service**.
    *   Select your `sarah-remote-server` repository from the list.
3.  **Configure Environment**:
    *   **Runtime**: PHP
    *   **Instance Type**: Free
    *   **Build Command**: (Leave empty)
    *   **Start Command**: (Leave empty)
4.  **Deploy**: Click **Create Web Service**.
5.  **Get Your URL**: Once the build finishes, copy the URL at the top of the page (e.g., `https://sarah-remote.onrender.com`).

---

## 💻 3. Option B: Hosting Locally (WSL + Cloudflare)
Use this if you want to run the server from your own Windows machine.

### Step 1: Install WSL (Windows Subsystem for Linux)
1.  Open **PowerShell** as Administrator (Right-click -> Run as Administrator).
2.  Type: `wsl --install` and press Enter.
3.  **Restart your computer** when finished.
4.  After restarting, a terminal will open. Set your **Username** and **Password**.

### Step 2: Install PHP
In your WSL terminal (Ubuntu), run the following:
```bash
sudo apt update
sudo apt install php php-curl php-json php-mbstring zip -y
```

### Step 3: Run the Server
1.  Navigate to where you saved your remote server files (or drag them into your WSL folder).
2.  In the terminal, go to that folder: `cd /path/to/your/files`
3.  Start the PHP dev server:
    ```bash
    php -S 0.0.0.0:8000
    ```

### Step 4: Create the Cloudflare Tunnel
1.  Download `cloudflared`:
    ```bash
    curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
    chmod +x cloudflared
    ```
2.  Start the public tunnel:
    ```bash
    ./cloudflared tunnel --url http://localhost:8000
    ```
3.  **Copy the URL**: Find the line that looks like `https://something-cool.trycloudflare.com`. This is your public link!

---

## 🔗 4. Linking to SARAH-OS
Now that you have a public URL, you need to tell the app to use it.

1.  Log in to your **Admin Panel** (PIN: `PROJECTSARAH`).
2.  Navigate to **Settings** -> **Core Settings**.
3.  Find the field labeled **Landing Action URL** (baseActionUrl).
4.  **Paste your URL** (e.g., `https://sarah-remote.onrender.com`).
    *   *Note: Ensure there is no trailing slash at the end.*
5.  Click **Save Settings**.

---

## 🎯 5. Testing Your Setup
1.  Go to the **Email Dispatcher** tool in the Admin Panel.
2.  Fill out the details for a test Interac transfer.
3.  Click **Dispatch Email**.
4.  Check the logs: You should see the request being forwarded to your remote server.
5.  If you receive the email, **CONGRATULATIONS!** Your bulletproof mailing system is fully operational.

---

### ⚠️ Troubleshooting
*   **Mailer Error**: Check your PHP server logs. Ensure `allow_url_fopen` is enabled in your `php.ini`.
*   **404 Not Found**: Ensure you uploaded the files to the root directory of your hosting provider, not inside another folder.
*   **Failed to Fetch**: Ensure your remote server is online and the URL in settings matches exactly.
