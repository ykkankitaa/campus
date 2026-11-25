# Oxfordian Scholastic Society

## Deploy

The frontend is a static site for Vercel. The Flask API remains a separate Render service.

1. Deploy `backend/render.yaml` on Render and configure `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
2. Confirm the API responds at `https://events-api.onrender.com/health`.
3. Import this repository into Vercel with the repository root as the project root. `vercel.json` sets `frontend` as the static output and proxies `/api/*` and `/health` to Render.
4. If Render assigns a different service URL, update both destinations in `vercel.json` to that URL and redeploy Vercel.

For local development, install the backend dependencies, copy `backend/.env.example` to `backend/.env`, fill in your Supabase settings, then run `python app.py` from `backend` and open `http://localhost:5000`.
