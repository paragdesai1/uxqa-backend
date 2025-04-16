# UXQA Backend

This is the backend service for UXQA — a design vs. code visual comparison tool.

## Features
- Upload Figma design frames
- View overlays via Chrome extension
- API to fetch design frames by project

## Deploying to Render

1. Push this folder to GitHub.
2. Go to [https://render.com](https://render.com) → New Web Service.
3. Connect the GitHub repo.
4. Set root directory to `backend/` if needed.
5. Build Command:
   ```bash
   npm install && npm run build
   ```
6. Start Command:
   ```bash
   npm start
   ```
