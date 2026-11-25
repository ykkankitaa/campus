const isLocalDevServer = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  && window.location.port !== "5000";
const API_BASE = window.SOCIETY_API_URL
  || (window.location.protocol === "file:" || isLocalDevServer ? "http://localhost:5000" : "");
const STUDENT_ID = window.SOCIETY_USER_ID || "f585ef3a-d7b7-47a4-b51e-1d0db5100d7e";

const app = document.getElementById("app");
const pageTitle = document.getElementById("page-title");
let events = [];
let registrations = [];
let activeFilter = "All";
let eventsLoadError = "";
let registrationsLoadError = "";

const eventVisuals = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85"
];

async function api(path, options = {}) {
  const response = await fetch(API_BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": STUDENT_ID,
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "The Society Registry is unavailable.");
  return data;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function icon(name) {
  return `<span class="material-symbols-outlined">${name}</span>`;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

async function loadEvents() {
  app.innerHTML = `<div class="loading">Opening the Society Registry...</div>`;
  try {
    events = await api("/api/events");
    eventsLoadError = "";
  } catch (error) {
    events = [];
    eventsLoadError = error.message;
  }
  renderEvents();
}

function renderEvents() {
  if (eventsLoadError) {
    app.innerHTML = `<div class="page"><div class="empty">${escapeHtml(eventsLoadError)}<br /><button class="secondary" id="retry-events" type="button">Retry connection</button></div></div>`;
    document.getElementById("retry-events").addEventListener("click", loadEvents);
    return;
  }

  const query = (document.getElementById("event-search")?.value || "").toLowerCase();
  const filtered = events.filter(event => {
    const matchesText = `${event.title} ${event.status}`.toLowerCase().includes(query);
    const matchesFilter = activeFilter === "All" ||
      (activeFilter === "Upcoming" && event.status === "upcoming") ||
      (activeFilter === "Ongoing" && event.status === "ongoing") ||
      (activeFilter === "Archived" && event.status === "archived");
    return matchesText && matchesFilter;
  });

  app.innerHTML = `
    <div class="page">
      <div class="page-heading">
        <div><div class="eyebrow">Michaelmas Term · Conclaves & Symposia</div><h1>Society Events</h1></div>
        <div class="year">Folio III · 1894</div>
      </div>
      <div class="toolbar">
        <div class="search-wrap">${icon("search")}<input id="event-search" type="search" value="${escapeHtml(query)}" placeholder="Search the registry..." /></div>
        <div class="filters" aria-label="Event filters">
          ${["All", "Upcoming", "Ongoing", "Archived"].map(name =>
            `<button class="chip ${activeFilter === name ? "active" : ""}" type="button" data-filter="${name}">${name === "All" ? "All Gatherings" : name}</button>`
          ).join("")}
        </div>
      </div>
      <div class="status-row"><strong>Chamber Status</strong><span>${filtered.length} gatherings recorded</span></div>
      ${filtered.length ? `<div class="event-grid">${filtered.map((event, index) => eventCard(event, index)).join("")}</div>` :
        `<div class="empty">No gatherings match this search.</div>`}
    </div>`;

  document.getElementById("event-search").addEventListener("input", event => {
    const { selectionStart, selectionEnd } = event.target;
    renderEvents();
    const search = document.getElementById("event-search");
    search.focus();
    search.setSelectionRange(selectionStart, selectionEnd);
  });
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderEvents();
    });
  });
  document.querySelectorAll("[data-register]").forEach(button => {
    button.addEventListener("click", () => register(button.dataset.register));
  });
}

function eventCard(event, index) {
  const registered = registrations.some(item => item.event_id === event.id);
  const full = event.available <= 0;
  const featured = index === 0;
  return `
    <article class="event-card ${featured ? "featured" : ""}">
      <div class="event-image" style="background-image:url('${eventVisuals[index % eventVisuals.length]}')">
        <span class="tag">${escapeHtml(event.status || "Upcoming")}</span>
      </div>
      <div class="event-body">
        <div class="event-meta"><span>Symposium</span><span>${featured ? "Now in Registry" : "Michaelmas"}</span></div>
        <h2>${escapeHtml(event.title)}</h2>
        <div class="location">${icon("location_on")} Society Hall · Chamber ${index + 1}</div>
        <p>${featured ? "A formal gathering for the exchange of scholarship, archival study, and collegiate discourse." : "Members are invited to join a focused session of study and practical exchange."}</p>
        <div class="card-foot">
          <span class="capacity">${event.available} places · ${event.capacity} capacity</span>
          <button class="primary" type="button" data-register="${event.id}" ${full || registered ? "disabled" : ""}>
            ${registered ? "Registered" : full ? "Full" : "Reserve Pass"}
          </button>
        </div>
      </div>
    </article>`;
}

async function register(eventId) {
  try {
    await api("/api/registrations", {
      method: "POST",
      body: JSON.stringify({ event_id: eventId, user_id: STUDENT_ID })
    });
    showToast("Your folio pass has been entered.");
    await loadRegistrations();
    await loadEvents();
  } catch (error) {
    showToast(error.message);
  }
}

async function loadRegistrations() {
  try {
    registrations = await api("/api/me/registrations");
    registrationsLoadError = "";
  } catch (error) {
    registrations = [];
    registrationsLoadError = error.message;
  }
}

async function renderProfile() {
  pageTitle.textContent = "Profile";
  app.innerHTML = `<div class="loading">Retrieving your scholar folio...</div>`;
  await loadRegistrations();
  const uniqueEvents = registrations.map(item => item.event).filter(Boolean);
  app.innerHTML = `
    <div class="page">
      <div class="profile-layout">
        <section class="profile-card">
          <div class="avatar">RS</div>
          <div class="eyebrow">Fellow in Good Standing</div>
          <h1>Rahul Sharma</h1>
          <p>Student member · Oxfordian Scholastic Society</p>
          <button class="secondary" type="button" id="dispatch">Dispatch Missive</button>
        </section>
        <div>
          <div class="metrics">
            <div class="metric"><strong>${uniqueEvents.length}</strong><span>Registrations</span></div>
            <div class="metric"><strong>${events.length}</strong><span>Society Events</span></div>
            <div class="metric"><strong>${new Set(uniqueEvents.map(e => e.status)).size}</strong><span>Terms</span></div>
          </div>
          <div class="page-heading"><div><div class="eyebrow">Admitted Gatherings</div><h1 style="font-size:28px">Registered Folios</h1></div></div>
          ${registrationsLoadError ? `<div class="empty">${escapeHtml(registrationsLoadError)}</div>` : registrations.length ? `<div class="registration-list">${registrations.map(item => {
            const event = item.event;
            return `<div class="registration"><div><h3>${escapeHtml(event?.title || "Unknown gathering")}</h3><small>Registration recorded · ${escapeHtml(item.created_at?.slice(0, 10) || "")}</small></div><span class="eyebrow">Admitted</span></div>`;
          }).join("")}</div>` : `<div class="empty">No gatherings registered yet.</div>`}
        </div>
      </div>
    </div>`;
  document.getElementById("dispatch").addEventListener("click", () => showToast("Missive sealed and sent to the Provost."));
}

function renderSimple(title, copy) {
  app.innerHTML = `<div class="page"><section class="profile-card"><div class="avatar">OSS</div><div class="eyebrow">${escapeHtml(title)}</div><h1>${escapeHtml(title)}</h1><p>${escapeHtml(copy)}</p></section></div>`;
}

async function navigate(view) {
  document.querySelectorAll("[data-view]").forEach(el => el.classList.toggle("active", el.dataset.view === view));
  document.querySelectorAll(".bottom-nav [data-view]").forEach(el => el.classList.toggle("active", el.dataset.view === view));

  if (view === "events") {
    pageTitle.textContent = "Conclaves";
    await loadEvents();
  } else if (view === "profile") {
    await renderProfile();
  } else if (view === "symposium") {
    pageTitle.textContent = "Symposium";
    renderSimple("Symposium", "Proceedings, annotated tracts, and scholarly exchanges are gathered here for Fellows of the Society.");
  } else {
    pageTitle.textContent = "The Society";
    renderSimple("About the Society", "A collegiate registry for conclaves, workshops, and archival exchange.");
  }
}

document.querySelectorAll("[data-view]").forEach(element => {
  element.addEventListener("click", () => navigate(element.dataset.view));
});

(async () => {
  await loadRegistrations();
  await navigate("events");
})();
