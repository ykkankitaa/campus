"""Event browsing and registration API backed by Supabase."""

from __future__ import annotations

import os
from pathlib import Path
from uuid import UUID

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from supabase import create_client


load_dotenv()

app = Flask(__name__)

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_PUBLISHABLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be configured")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def current_user_id() -> str | None:
    return (
        request.headers.get("X-User-Id")
        or request.headers.get("X-User-ID")
        or request.args.get("user_id")
    )


def validate_uuid(value: str) -> bool:
    try:
        UUID(str(value))
        return True
    except (TypeError, ValueError, AttributeError):
        return False


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-User-Id"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@app.get("/health")
def health():
    return jsonify(status="ok")


@app.get("/api/events")
def get_events():
    response = supabase.table("events").select("*").order("title").execute()
    events = response.data or []
    if not events:
        return jsonify(events=[] )

    registration_response = supabase.table("registrations").select("event_id").execute()
    registration_counts: dict[str, int] = {}
    for registration in registration_response.data or []:
        event_id = registration["event_id"]
        registration_counts[event_id] = registration_counts.get(event_id, 0) + 1

    for event in events:
        event["registered_count"] = registration_counts.get(event["id"], 0)
        event["available"] = max(event["capacity"] - event["registered_count"], 0)
    return jsonify(events)


@app.get("/api/events/<event_id>")
def get_event(event_id: str):
    if not validate_uuid(event_id):
        return jsonify(error="Invalid event id"), 400

    response = supabase.table("events").select("*").eq("id", event_id).execute()
    if not response.data:
        return jsonify(error="Event not found"), 404
    event = response.data[0]
    registrations = supabase.table("registrations").select("id").eq("event_id", event_id).execute()
    event["registered_count"] = len(registrations.data or [])
    event["available"] = max(event["capacity"] - event["registered_count"], 0)
    return jsonify(event)


@app.post("/api/registrations")
def create_registration():
    payload = request.get_json(silent=True) or {}
    user_id = payload.get("user_id") or current_user_id()
    event_id = payload.get("event_id")

    if not user_id or not validate_uuid(str(user_id)):
        return jsonify(error="Authentication required"), 401
    if not event_id or not validate_uuid(str(event_id)):
        return jsonify(error="A valid event_id is required"), 400

    event_response = supabase.table("events").select("*").eq("id", event_id).execute()
    if not event_response.data:
        return jsonify(error="Event not found"), 404

    event = event_response.data[0]
    existing = (
        supabase.table("registrations")
        .select("id")
        .eq("user_id", user_id)
        .eq("event_id", event_id)
        .execute()
    )
    if existing.data:
        return jsonify(error="Already registered", registration=existing.data[0]), 409

    registrations = supabase.table("registrations").select("id").eq("event_id", event_id).execute()
    if len(registrations.data or []) >= event["capacity"]:
        return jsonify(error="Event is full"), 409

    created = (
        supabase.table("registrations")
        .insert({"user_id": user_id, "event_id": event_id})
        .execute()
    )
    if not created.data:
        return jsonify(error="Registration could not be created"), 500
    return jsonify(created.data[0]), 201


@app.get("/api/me/registrations")
def get_my_registrations():
    user_id = current_user_id()
    if not user_id or not validate_uuid(user_id):
        return jsonify(error="Authentication required"), 401

    registrations = (
        supabase.table("registrations")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )
    data = registrations.data or []
    if not data:
        return jsonify([])

    event_ids = [item["event_id"] for item in data]
    events = supabase.table("events").select("*").in_("id", event_ids).execute()
    event_map = {event["id"]: event for event in (events.data or [])}
    result = []
    for registration in data:
        result.append({
            **registration,
            "event": event_map.get(registration["event_id"]),
        })
    return jsonify(result)


@app.get("/api/events/<event_id>/registrations")
def get_event_registrations(event_id: str):
    user_id = current_user_id()
    if not user_id or not validate_uuid(user_id):
        return jsonify(error="Authentication required"), 401
    if not validate_uuid(event_id):
        return jsonify(error="Invalid event id"), 400

    event_response = supabase.table("events").select("*").eq("id", event_id).execute()
    if not event_response.data:
        return jsonify(error="Event not found"), 404
    event = event_response.data[0]

    user_response = supabase.table("users").select("role").eq("id", user_id).execute()
    user = user_response.data[0] if user_response.data else None
    if not user or user["role"] != "organizer" or event["organizer_id"] != user_id:
        return jsonify(error="Only the owning organizer can view attendees"), 403

    registrations = (
        supabase.table("registrations")
        .select("*")
        .eq("event_id", event_id)
        .execute()
    )
    return jsonify(registrations.data or [])


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path: str):
    if path and (FRONTEND_DIR / path).is_file():
        return send_from_directory(FRONTEND_DIR, path)
    return send_from_directory(FRONTEND_DIR, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)

 