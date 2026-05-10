import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─── */
const TEAL = "#0F766E";
const ORANGE = "#F97316";
const ACCENT = "#14B8A6";
const BG = "linear-gradient(135deg,#F0FDFA 0%,#E0F2F1 100%)";
const FONT = "'DM Sans', 'Segoe UI', sans-serif";

/* ─── DATA ─── */
const DESTINATIONS = [
  { name: "Paris", country: "France", emoji: "🗼", cost: "₹₹₹", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", tag: "Romance" },
  { name: "Bali", country: "Indonesia", emoji: "🌴", cost: "₹₹", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", tag: "Beach" },
  { name: "Tokyo", country: "Japan", emoji: "⛩️", cost: "₹₹₹", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", tag: "Culture" },
  { name: "Dubai", country: "UAE", emoji: "🏙️", cost: "₹₹₹₹", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80", tag: "Luxury" },
  { name: "Rome", country: "Italy", emoji: "🏛️", cost: "₹₹₹", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80", tag: "History" },
  { name: "New York", country: "USA", emoji: "🗽", cost: "₹₹₹₹", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80", tag: "City" },
];

const SAMPLE_TRIPS = [
  { id: 1, name: "Europe Extravaganza", cover: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80", start: "Mar 15", end: "Mar 29", stops: 5, days: 14, budget: "₹2,85,000", status: "upcoming" },
  { id: 2, name: "Bali Bliss", cover: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", start: "May 1", end: "May 8", stops: 3, days: 7, budget: "₹95,000", status: "upcoming" },
  { id: 3, name: "Japan Discovery", cover: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", start: "Jan 5", end: "Jan 14", stops: 4, days: 9, budget: "₹1,80,000", status: "completed" },
];

const ACTIVITIES = [
  { name: "Eiffel Tower Visit", city: "Paris", type: "Sightseeing", duration: "3h", cost: "₹2,200", rating: 4.9, img: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=300&q=80" },
  { name: "Bali Rice Terrace Hike", city: "Bali", type: "Adventure", duration: "4h", cost: "₹1,500", rating: 4.7, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80" },
  { name: "Tokyo Ramen Tour", city: "Tokyo", type: "Food", duration: "2h", cost: "₹3,000", rating: 4.8, img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=300&q=80" },
  { name: "Rome Colosseum Tour", city: "Rome", type: "Cultural", duration: "3h", cost: "₹2,800", rating: 4.6, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&q=80" },
  { name: "Dubai Desert Safari", city: "Dubai", type: "Adventure", duration: "6h", cost: "₹8,500", rating: 4.8, img: "https://images.unsplash.com/photo-1551041777-4a3d6c867861?w=300&q=80" },
  { name: "Times Square Walk", city: "New York", type: "Sightseeing", duration: "2h", cost: "₹0", rating: 4.4, img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80" },
];

const PACKING = {
  Clothing: [
    { id: 1, name: "T-shirts (5)", packed: true },
    { id: 2, name: "Jeans/Trousers (2)", packed: true },
    { id: 3, name: "Formal shirt (1)", packed: false },
    { id: 4, name: "Underwear & Socks", packed: true },
    { id: 5, name: "Jacket / Windcheater", packed: false },
  ],
  Documents: [
    { id: 6, name: "Passport", packed: true },
    { id: 7, name: "Visa documents", packed: true },
    { id: 8, name: "Travel insurance", packed: false },
    { id: 9, name: "Flight tickets (printed)", packed: true },
  ],
  Electronics: [
    { id: 10, name: "Phone + Charger", packed: true },
    { id: 11, name: "Power bank", packed: true },
    { id: 12, name: "Universal adapter", packed: false },
    { id: 13, name: "Earphones", packed: true },
  ],
  Toiletries: [
    { id: 14, name: "Toothbrush & Paste", packed: true },
    { id: 15, name: "Shampoo & Soap", packed: true },
    { id: 16, name: "Sunscreen SPF 50", packed: false },
    { id: 17, name: "Deodorant", packed: true },
  ],
  Medicines: [
    { id: 18, name: "Paracetamol", packed: false },
    { id: 19, name: "ORS Packets", packed: false },
    { id: 20, name: "Antacid", packed: true },
    { id: 21, name: "Band-aids", packed: false },
  ],
};

const INITIAL_STOPS = [
  { id: 1, city: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80", arrival: "Mar 15", departure: "Mar 19", activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"], budget: "₹85,000" },
  { id: 2, city: "Rome", country: "Italy", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&q=80", arrival: "Mar 19", departure: "Mar 22", activities: ["Colosseum Tour", "Vatican Museum", "Trevi Fountain"], budget: "₹65,000" },
  { id: 3, city: "Barcelona", country: "Spain", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&q=80", arrival: "Mar 22", departure: "Mar 25", activities: ["Sagrada Familia", "Park Güell", "La Boqueria"], budget: "₹70,000" },
  { id: 4, city: "Amsterdam", country: "Netherlands", img: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=200&q=80", arrival: "Mar 25", departure: "Mar 29", activities: ["Van Gogh Museum", "Canal Cruise", "Rijksmuseum"], budget: "₹65,000" },
];

const NOTES_INITIAL = [
  { id: 1, title: "Hotel Confirmation — Paris", content: "Check-in at Le Marais Hotel: booking ID #HM2026PAR. Early check-in at 10 AM confirmed.", date: "Feb 28, 2026", stop: "Paris" },
  { id: 2, title: "Tips for Rome Metro", content: "Buy 24-hour pass for €7. Metro Line A covers Vatican and Spanish Steps. Validate ticket before boarding.", date: "Mar 1, 2026", stop: "Rome" },
  { id: 3, title: "Emergency Contacts", content: "Travel insurance helpline: +91-80-4567-8900. Local emergency: 112 (works in all EU countries).", date: "Mar 2, 2026", stop: null },
];

const RESERVATIONS_INITIAL = [
  { id: 1, type: "flight", icon: "✈️", title: "IndiGo 6E-401", detail: "Mumbai → Paris · Mar 15, 06:45 AM", status: "Confirmed", color: "#0EA5E9" },
  { id: 2, type: "hotel", icon: "🏨", title: "Le Marais Boutique Hotel", detail: "Paris · Mar 15–19 · 4 nights", status: "Confirmed", color: TEAL },
  { id: 3, type: "hotel", icon: "🏨", title: "Hotel Gladiatori", detail: "Rome · Mar 19–22 · 3 nights", status: "Confirmed", color: TEAL },
  { id: 4, type: "train", icon: "🚆", title: "Eurail Pass", detail: "Paris → Rome · Mar 19, 09:00 AM", status: "Pending", color: ORANGE },
  { id: 5, type: "flight", icon: "✈️", title: "Ryanair FR-2291", detail: "Amsterdam → Mumbai · Mar 29, 11:30 PM", status: "Confirmed", color: "#0EA5E9" },
];

const WEATHER_DATA = {
  Paris: { temp: 14, icon: "🌤️", desc: "Partly Cloudy", humidity: 72, wind: "12 km/h" },
  Rome: { temp: 18, icon: "☀️", desc: "Sunny", humidity: 55, wind: "8 km/h" },
  Barcelona: { temp: 20, icon: "🌤️", desc: "Partly Cloudy", humidity: 60, wind: "15 km/h" },
  Amsterdam: { temp: 10, icon: "🌧️", desc: "Light Rain", humidity: 85, wind: "20 km/h" },
  Bali: { temp: 29, icon: "⛅", desc: "Tropical", humidity: 80, wind: "10 km/h" },
  Tokyo: { temp: 17, icon: "🌸", desc: "Spring Mild", humidity: 65, wind: "9 km/h" },
  Dubai: { temp: 38, icon: "☀️", desc: "Hot & Sunny", humidity: 30, wind: "5 km/h" },
};

const CITY_IMAGES = {
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80",
  Rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&q=80",
  Tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&q=80",
  Bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80",
  Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80",
  Barcelona: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=200&q=80",
  Amsterdam: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=200&q=80",
};

/* ─── SHARED UI ─── */
const GlassCard = ({ children, style = {} }) => (
  <div style={{
    background: "rgba(255,255,255,0.94)",
    borderRadius: 20,
    boxShadow: "0 4px 24px rgba(15,118,110,0.09)",
    border: "1px solid rgba(20,184,166,0.13)",
    ...style
  }}>{children}</div>
);

const Btn = ({ children, variant = "primary", onClick, style = {}, small = false, disabled = false }) => (
  <button onClick={onClick} disabled={disabled} style={{
    background: variant === "primary" ? `linear-gradient(135deg, ${TEAL}, ${ACCENT})` : variant === "orange" ? `linear-gradient(135deg, ${ORANGE}, #FB923C)` : variant === "red" ? "#EF4444" : variant === "ghost" ? "rgba(15,118,110,0.08)" : "transparent",
    color: variant === "outline" ? TEAL : variant === "ghost" ? TEAL : "#fff",
    border: variant === "outline" ? `2px solid ${TEAL}` : "none",
    borderRadius: 14,
    padding: small ? "8px 16px" : "12px 24px",
    fontWeight: 700,
    fontSize: small ? 13 : 15,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    fontFamily: FONT,
    opacity: disabled ? 0.6 : 1,
    letterSpacing: "0.01em",
    ...style
  }}
    onMouseEnter={e => !disabled && (e.currentTarget.style.transform = "scale(1.04)")}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
  >{children}</button>
);

const Badge = ({ children, color = TEAL }) => (
  <span style={{
    background: color + "18",
    color: color,
    borderRadius: 20,
    padding: "3px 10px",
    fontSize: 12,
    fontWeight: 700,
  }}>{children}</span>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} style={{
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    background: "none", border: "none", cursor: "pointer",
    color: active ? TEAL : "#94A3B8", padding: "6px 14px",
    fontFamily: FONT, transition: "color 0.2s", position: "relative"
  }}>
    {active && <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 3, background: `linear-gradient(90deg,${TEAL},${ACCENT})`, borderRadius: "0 0 4px 4px" }} />}
    <span style={{ fontSize: 22 }}>{icon}</span>
    <span style={{ fontSize: 11, fontWeight: active ? 800 : 500 }}>{label}</span>
  </button>
);

const TopBar = ({ title, onBack, rightEl }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid rgba(20,184,166,0.10)",
    background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
    position: "sticky", top: 0, zIndex: 20
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: "#F0FDFA", border: "none", borderRadius: 10,
          width: 36, height: 36, cursor: "pointer", fontSize: 18, color: TEAL,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>←</button>
      )}
      <span style={{ fontWeight: 800, fontSize: 18, color: "#1E293B", letterSpacing: "-0.02em" }}>{title}</span>
    </div>
    {rightEl}
  </div>
);

/* ─── MODAL ─── */
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center"
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: "24px 24px 0 0",
        width: "100%", maxWidth: 480, maxHeight: "85vh",
        overflowY: "auto", padding: 24
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#1E293B" }}>{title}</span>
          <button onClick={onClose} style={{ background: "#F0FDFA", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#64748B" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function Traveloop() {
  const [screen, setScreen] = useState("login");
  const [activeNav, setActiveNav] = useState("home");
  const [activeTrip, setActiveTrip] = useState(SAMPLE_TRIPS[0]);
  const [packItems, setPackItems] = useState(PACKING);
  const [packTab, setPackTab] = useState("Clothing");
  const [activityFilter, setActivityFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(NOTES_INITIAL);
  const [heroIdx, setHeroIdx] = useState(0);
  const [tripForm, setTripForm] = useState({ name: "", start: "", end: "", desc: "" });
  const [itineraryStops, setItineraryStops] = useState(INITIAL_STOPS);
  const [reservations, setReservations] = useState(RESERVATIONS_INITIAL);
  const [trips, setTrips] = useState(SAMPLE_TRIPS);
  const [expenses, setExpenses] = useState([
    { id: 1, desc: "Dinner — Le Jules Verne", city: "Paris", amount: 4500, cat: "Food", date: "Mar 15" },
    { id: 2, desc: "Metro Day Pass", city: "Paris", amount: 650, cat: "Transport", date: "Mar 16" },
    { id: 3, desc: "Colosseum Entry", city: "Rome", amount: 2800, cat: "Activities", date: "Mar 19" },
  ]);

  const heroImages = [
    { url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80", label: "Bali, Indonesia" },
    { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80", label: "Paris, France" },
    { url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80", label: "Tokyo, Japan" },
  ];

  useEffect(() => {
    if (screen !== "dashboard") return;
    const t = setInterval(() => setHeroIdx(i => (i + 1) % 3), 4000);
    return () => clearInterval(t);
  }, [screen]);

  const navTo = (s) => { setActiveNav(s); setScreen(s); };

  const totalPacked = Object.values(packItems).flat().filter(i => i.packed).length;
  const totalItems = Object.values(packItems).flat().length;

  if (screen === "login") return <LoginScreen onLogin={() => { setScreen("dashboard"); setActiveNav("home"); }} />;

  const showNav = ["dashboard", "mytrips", "explore", "profile"].includes(screen);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: BG, minHeight: "100vh", fontFamily: FONT, position: "relative", paddingBottom: showNav ? 72 : 0 }}>
      {screen === "dashboard" && <Dashboard heroImages={heroImages} heroIdx={heroIdx} onNav={(s) => setScreen(s)} onTripClick={(t) => { setActiveTrip(t); setScreen("tripdetail"); }} />}
      {screen === "mytrips" && <MyTrips trips={trips} onView={(t) => { setActiveTrip(t); setScreen("tripdetail"); }} onNew={() => setScreen("createtrip")} onDelete={(id) => setTrips(prev => prev.filter(t => t.id !== id))} />}
      {screen === "explore" && <ExploreScreen destinations={DESTINATIONS} activities={ACTIVITIES} cityFilter={cityFilter} setCityFilter={setCityFilter} activityFilter={activityFilter} setActivityFilter={setActivityFilter} />}
      {screen === "profile" && <ProfileScreen />}
      {screen === "createtrip" && <CreateTrip form={tripForm} setForm={setTripForm} onBack={() => setScreen("mytrips")} onCreate={(newTrip) => { setTrips(prev => [newTrip, ...prev]); setScreen("mytrips"); }} />}
      {screen === "tripdetail" && <TripDetail trip={activeTrip} onBack={() => setScreen("mytrips")} onNav={(s) => setScreen(s)} />}
      {screen === "itinerary" && <ItineraryBuilder stops={itineraryStops} setStops={setItineraryStops} onBack={() => setScreen("tripdetail")} />}
      {screen === "budget" && <BudgetScreen expenses={expenses} onBack={() => setScreen("tripdetail")} />}
      {screen === "packing" && <PackingScreen items={packItems} setItems={setPackItems} tab={packTab} setTab={setPackTab} total={totalPacked} max={totalItems} onBack={() => setScreen("tripdetail")} />}
      {screen === "notes" && <NotesScreen notes={notes} setNotes={setNotes} noteText={noteText} setNoteText={setNoteText} onBack={() => setScreen("tripdetail")} />}
      {screen === "shared" && <SharedView trip={activeTrip} stops={itineraryStops} onBack={() => setScreen("tripdetail")} />}
      {screen === "admin" && <AdminDashboard onBack={() => setScreen("dashboard")} />}
      {screen === "reservations" && <ReservationsScreen reservations={reservations} setReservations={setReservations} onBack={() => setScreen("tripdetail")} />}
      {screen === "weather" && <WeatherScreen stops={itineraryStops} onBack={() => setScreen("tripdetail")} />}
      {screen === "expenses" && <ExpenseTracker expenses={expenses} setExpenses={setExpenses} onBack={() => setScreen("tripdetail")} />}
      {screen === "magic" && <MagicItinerary stops={itineraryStops} onBack={() => setScreen("tripdetail")} />}

      {showNav && (
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 480, maxWidth: "100vw",
          background: "rgba(255,255,255,0.98)", borderTop: "1px solid rgba(20,184,166,0.12)",
          display: "flex", justifyContent: "space-around", padding: "8px 0 4px",
          backdropFilter: "blur(16px)", zIndex: 100,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)"
        }}>
          <NavItem icon="🏠" label="Home" active={activeNav === "home"} onClick={() => { setActiveNav("home"); setScreen("dashboard"); }} />
          <NavItem icon="🗺️" label="My Trips" active={activeNav === "mytrips"} onClick={() => { setActiveNav("mytrips"); setScreen("mytrips"); }} />
          <NavItem icon="🔍" label="Explore" active={activeNav === "explore"} onClick={() => { setActiveNav("explore"); setScreen("explore"); }} />
          <NavItem icon="👤" label="Profile" active={activeNav === "profile"} onClick={() => { setActiveNav("profile"); setScreen("profile"); }} />
        </div>
      )}
    </div>
  );
}

/* ─── LOGIN ─── */
function LoginScreen({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 800);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(rgba(0,0,0,0.52),rgba(0,0,0,0.52)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80') center/cover`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24,
      fontFamily: FONT
    }}>
      <div style={{ color: "#fff", textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 46, marginBottom: 6, filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.4))" }}>✈️</div>
        <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-1.5px" }}>Traveloop</div>
        <div style={{ fontSize: 15, opacity: 0.75, marginTop: 4, letterSpacing: "0.02em" }}>Plan smarter. Travel happier.</div>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.10)", backdropFilter: "blur(24px)",
        borderRadius: 24, padding: "32px 28px", width: "100%", maxWidth: 380,
        border: "1px solid rgba(255,255,255,0.22)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{ color: "#fff", margin: "0 0 6px", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>
          {isSignup ? "Create Account" : "Welcome back, Harsh 👋"}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", margin: "0 0 24px", fontSize: 14 }}>Your next adventure awaits</p>

        {isSignup && <input placeholder="Full Name" style={inputStyle} />}
        <input placeholder="Email address" defaultValue="harsh@traveloop.in" style={inputStyle} />
        <input placeholder="Password" type="password" defaultValue="••••••••" style={{ ...inputStyle, marginBottom: 20 }} />

        <button onClick={handleLogin} disabled={loading} style={{
          width: "100%", padding: "15px", borderRadius: 14,
          background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`,
          color: "#fff", border: "none", fontWeight: 800, fontSize: 16,
          cursor: "pointer", marginBottom: 12, fontFamily: FONT,
          boxShadow: `0 4px 20px ${TEAL}50`, letterSpacing: "0.01em",
          opacity: loading ? 0.8 : 1, transition: "all 0.2s"
        }}>
          {loading ? "Signing in…" : isSignup ? "Create Account ✈️" : "Login ✈️"}
        </button>

        <button style={{
          width: "100%", padding: "13px", borderRadius: 14,
          background: "rgba(255,255,255,0.12)", color: "#fff",
          border: "1px solid rgba(255,255,255,0.25)", fontWeight: 600,
          fontSize: 15, cursor: "pointer", marginBottom: 16, fontFamily: FONT
        }}>🔵 Continue with Google</button>

        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
          {isSignup ? "Already have an account? " : "New here? "}
          <span onClick={() => setIsSignup(!isSignup)} style={{ color: ORANGE, cursor: "pointer", fontWeight: 800 }}>
            {isSignup ? "Login" : "Create Account"}
          </span>
        </div>
        {!isSignup && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer" }}>Forgot Password?</span>
          </div>
        )}
      </div>
    </div>
  );
}
const inputStyle = {
  width: "100%", padding: "13px 16px", borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.12)",
  color: "#fff", marginBottom: 12, fontSize: 15, fontFamily: FONT,
  boxSizing: "border-box", outline: "none"
};

/* ─── DASHBOARD ─── */
function Dashboard({ heroImages, heroIdx, onNav, onTripClick }) {
  return (
    <div>
      {/* Header */}
      <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>Good Morning ✈️</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#0F172A", letterSpacing: "-0.5px" }}>Harsh Parmar</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 17, boxShadow: `0 4px 12px ${TEAL}40` }}>H</div>
          <div style={{ width: 36, height: 36, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", fontSize: 18, cursor: "pointer" }}>🔔</div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ margin: "16px 20px", borderRadius: 22, overflow: "hidden", position: "relative", height: 210 }}>
        <img src={heroImages[heroIdx].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.6s" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 20%, rgba(0,0,0,0.68))" }} />
        <div style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 21, letterSpacing: "-0.3px" }}>Where next, Harsh? 🌍</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 2 }}>{heroImages[heroIdx].label}</div>
        </div>
        <div style={{ position: "absolute", bottom: 14, right: 16, display: "flex", gap: 5 }}>
          {heroImages.map((_, i) => (
            <div key={i} style={{ width: i === heroIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === heroIdx ? "#fff" : "rgba(255,255,255,0.35)", transition: "width 0.4s" }} />
          ))}
        </div>
        <div style={{ position: "absolute", top: 14, right: 14, background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`, borderRadius: 20, padding: "5px 12px", color: "#fff", fontSize: 12, fontWeight: 700, boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
          🟢 Works Offline
        </div>
      </div>

      {/* Search */}
      <div style={{ margin: "0 20px 16px" }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1.5px solid rgba(20,184,166,0.12)" }}>
          <span style={{ fontSize: 18, opacity: 0.5 }}>🔍</span>
          <span style={{ color: "#94A3B8", fontSize: 14 }}>Search destinations, cities…</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, margin: "0 20px 20px" }}>
        {[
          { label: "Upcoming", value: "2", icon: "✈️", color: TEAL },
          { label: "Budget", value: "₹4.85L", icon: "💰", color: ORANGE },
          { label: "Saved", value: "18", icon: "❤️", color: "#E11D48" },
        ].map(s => (
          <GlassCard key={s.label} style={{ padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontWeight: 900, fontSize: 18, color: s.color, letterSpacing: "-0.5px" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#64748B", marginTop: 1 }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Recent Trips */}
      <div style={{ padding: "0 20px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: "#0F172A", letterSpacing: "-0.3px" }}>My Trips</span>
        <span onClick={() => onNav("mytrips")} style={{ color: TEAL, fontSize: 13, cursor: "pointer", fontWeight: 700 }}>See all →</span>
      </div>
      <div style={{ display: "flex", gap: 14, padding: "10px 20px 18px", overflowX: "auto" }}>
        {SAMPLE_TRIPS.map(t => (
          <div key={t.id} onClick={() => onTripClick(t)} style={{ minWidth: 200, borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.09)", cursor: "pointer", flexShrink: 0, transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ position: "relative" }}>
              <img src={t.cover} alt="" style={{ width: "100%", height: 105, objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <Badge color={t.status === "upcoming" ? TEAL : "#64748B"}>{t.status === "upcoming" ? "Upcoming" : "Done"}</Badge>
              </div>
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#0F172A", letterSpacing: "-0.2px" }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "#64748B", marginTop: 3 }}>{t.start} – {t.end}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, alignItems: "center" }}>
                <Badge>{t.stops} stops</Badge>
                <span style={{ fontSize: 13, fontWeight: 800, color: ORANGE }}>{t.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discover */}
      <div style={{ padding: "0 20px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: "#0F172A", letterSpacing: "-0.3px" }}>Discover</span>
        <span style={{ color: TEAL, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>View all →</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "10px 20px 20px" }}>
        {DESTINATIONS.slice(0, 4).map(d => (
          <div key={d.name} style={{ borderRadius: 18, overflow: "hidden", position: "relative", height: 125, cursor: "pointer", boxShadow: "0 3px 14px rgba(0,0,0,0.10)", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <img src={d.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 35%,rgba(0,0,0,0.62))" }} />
            <div style={{ position: "absolute", bottom: 9, left: 11, right: 11 }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{d.name}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>{d.country}</div>
            </div>
            <div style={{ position: "absolute", top: 9, right: 9, background: ORANGE, borderRadius: 20, padding: "3px 9px", color: "#fff", fontSize: 11, fontWeight: 700 }}>{d.tag}</div>
          </div>
        ))}
      </div>

      {/* Admin */}
      <div style={{ padding: "0 20px 24px", textAlign: "center" }}>
        <span onClick={() => onNav("admin")} style={{ color: TEAL, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>📊 Admin Dashboard</span>
      </div>

      {/* FAB */}
      <button onClick={() => onNav("createtrip")} style={{
        position: "fixed", bottom: 88, right: 20, width: 58, height: 58,
        borderRadius: "50%", background: `linear-gradient(135deg, ${ORANGE}, #FB923C)`,
        border: "none", color: "#fff", fontSize: 30, cursor: "pointer",
        boxShadow: `0 6px 24px rgba(249,115,22,0.45)`, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s"
      }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >+</button>
    </div>
  );
}

/* ─── MY TRIPS ─── */
function MyTrips({ trips, onView, onNew, onDelete }) {
  return (
    <div>
      <TopBar title="My Trips ✈️" rightEl={<Btn small onClick={onNew} variant="orange">+ New</Btn>} />
      <div style={{ padding: 16 }}>
        {["upcoming", "completed"].map(status => {
          const filtered = trips.filter(t => t.status === status);
          if (!filtered.length) return null;
          return (
            <div key={status}>
              <div style={{ fontWeight: 800, fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1.5px", margin: "12px 0 10px" }}>{status}</div>
              {filtered.map(t => (
                <GlassCard key={t.id} style={{ marginBottom: 14, overflow: "hidden" }}>
                  <div style={{ position: "relative" }}>
                    <img src={t.cover} alt="" style={{ width: "100%", height: 140, objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.55))" }} />
                    <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                      <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: "-0.3px" }}>{t.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>{t.start} – {t.end}</div>
                    </div>
                    <div style={{ position: "absolute", bottom: 12, right: 14, fontWeight: 900, color: ORANGE, fontSize: 16 }}>{t.budget}</div>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge>{t.stops} stops</Badge>
                        <Badge>{t.days} days</Badge>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Btn small onClick={() => onView(t)}>View</Btn>
                        <Btn small variant="outline">Edit</Btn>
                        <Btn small variant="red" onClick={() => onDelete(t.id)}>🗑</Btn>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── CREATE TRIP ─── */
function CreateTrip({ form, setForm, onBack, onCreate }) {
  const handleCreate = () => {
    if (!form.name.trim()) return;
    const newTrip = {
      id: Date.now(),
      name: form.name,
      cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
      start: form.start || "TBD",
      end: form.end || "TBD",
      stops: 0, days: 0, budget: "₹0", status: "upcoming"
    };
    onCreate(newTrip);
  };
  return (
    <div>
      <TopBar title="Create New Trip" onBack={onBack} />
      <div style={{ padding: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 52 }}>🗺️</div>
          <div style={{ fontWeight: 900, fontSize: 21, color: "#0F172A", letterSpacing: "-0.5px", marginTop: 6 }}>Plan Your Adventure</div>
          <div style={{ color: "#64748B", fontSize: 14, marginTop: 4 }}>Fill in the details to get started</div>
        </div>
        <GlassCard style={{ padding: 20 }}>
          {[
            { label: "Trip Name", key: "name", placeholder: "e.g. Europe Summer 2026", icon: "✈️" },
            { label: "Start Date", key: "start", placeholder: "YYYY-MM-DD", icon: "📅", type: "date" },
            { label: "End Date", key: "end", placeholder: "YYYY-MM-DD", icon: "📅", type: "date" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block" }}>{f.icon} {f.label}</label>
              <input type={f.type || "text"} placeholder={f.placeholder} value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #E2E8F0", fontSize: 15, fontFamily: FONT, boxSizing: "border-box", outline: "none" }}
              />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block" }}>📝 Description</label>
            <textarea placeholder="What's this trip about? Any special plans?" value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })} rows={3}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #E2E8F0", fontSize: 15, fontFamily: FONT, resize: "none", boxSizing: "border-box", outline: "none" }}
            />
          </div>
          <div style={{ border: "2px dashed #CBD5E1", borderRadius: 14, padding: "20px", textAlign: "center", marginBottom: 20, cursor: "pointer" }}>
            <div style={{ fontSize: 30 }}>🖼️</div>
            <div style={{ color: "#64748B", fontSize: 14, marginTop: 4 }}>Upload cover photo</div>
            <div style={{ color: "#94A3B8", fontSize: 12 }}>PNG, JPG up to 5MB</div>
          </div>
          <Btn style={{ width: "100%" }} onClick={handleCreate}>Create Trip 🚀</Btn>
        </GlassCard>
      </div>
    </div>
  );
}

/* ─── TRIP DETAIL ─── */
function TripDetail({ trip, onBack, onNav }) {
  const tabs = [
    { key: "itinerary", icon: "🗺️", label: "Itinerary" },
    { key: "budget", icon: "💰", label: "Budget" },
    { key: "packing", icon: "🎒", label: "Packing" },
    { key: "notes", icon: "📝", label: "Notes" },
    { key: "reservations", icon: "🎫", label: "Bookings" },
    { key: "weather", icon: "🌤️", label: "Weather" },
    { key: "expenses", icon: "💳", label: "Expenses" },
    { key: "magic", icon: "✨", label: "Magic AI" },
  ];
  return (
    <div>
      <div style={{ position: "relative" }}>
        <img src={trip.cover} alt="" style={{ width: "100%", height: 210, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 25%,rgba(0,0,0,0.70))" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: 10, width: 38, height: 38, cursor: "pointer", fontSize: 18 }}>←</button>
        <button onClick={() => onNav("shared")} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: 10, padding: "7px 13px", cursor: "pointer", fontSize: 13, fontWeight: 700, color: TEAL }}>Share 🔗</button>
        <div style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 23, letterSpacing: "-0.5px" }}>{trip.name}</div>
          <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, marginTop: 3 }}>{trip.start} – {trip.end} · {trip.stops} stops · {trip.days} days</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "16px 16px 4px" }}>
        {[
          { label: "Total Budget", value: trip.budget, icon: "💰" },
          { label: "Days", value: trip.days, icon: "📆" },
          { label: "Cities", value: trip.stops, icon: "🌍" },
        ].map(s => (
          <GlassCard key={s.label} style={{ padding: "12px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>{s.icon}</div>
            <div style={{ fontWeight: 900, fontSize: 17, color: TEAL }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#64748B" }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>
      <div style={{ padding: "12px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => onNav(t.key)} style={{
              background: "#fff", border: "1.5px solid rgba(20,184,166,0.15)", borderRadius: 18,
              padding: "18px 12px", cursor: "pointer", textAlign: "center", fontFamily: FONT,
              transition: "all 0.2s", boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = TEAL + "0E"; e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "rgba(20,184,166,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 30 }}>{t.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1E293B", marginTop: 5 }}>{t.label}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "4px 16px 24px" }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: "#0F172A", marginBottom: 12, letterSpacing: "-0.2px" }}>Itinerary Preview</div>
        {INITIAL_STOPS.map((s, i) => (
          <div key={s.city} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
            <img src={s.img} alt="" style={{ width: 50, height: 50, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1E293B" }}>{s.city}, {s.country}</div>
              <div style={{ fontSize: 12, color: "#64748B" }}>{s.arrival} → {s.departure}</div>
            </div>
            <span style={{ fontWeight: 800, color: ORANGE, fontSize: 13 }}>{s.budget}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ITINERARY BUILDER ─── */
function ItineraryBuilder({ stops, setStops, onBack }) {
  const [view, setView] = useState("timeline");
  const [showAddStop, setShowAddStop] = useState(false);
  const [newStop, setNewStop] = useState({ city: "", country: "", arrival: "", departure: "" });
  const [addActivityFor, setAddActivityFor] = useState(null);
  const [newActivity, setNewActivity] = useState("");

  const addStop = () => {
    if (!newStop.city.trim()) return;
    setStops(prev => [...prev, {
      id: Date.now(),
      city: newStop.city,
      country: newStop.country || "Unknown",
      img: CITY_IMAGES[newStop.city] || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=80",
      arrival: newStop.arrival || "TBD",
      departure: newStop.departure || "TBD",
      activities: [],
      budget: "₹0"
    }]);
    setNewStop({ city: "", country: "", arrival: "", departure: "" });
    setShowAddStop(false);
  };

  const addActivity = (stopId) => {
    if (!newActivity.trim()) return;
    setStops(prev => prev.map(s => s.id === stopId ? { ...s, activities: [...s.activities, newActivity] } : s));
    setNewActivity("");
    setAddActivityFor(null);
  };

  const removeStop = (id) => setStops(prev => prev.filter(s => s.id !== id));

  return (
    <div>
      <TopBar title="Itinerary Builder" onBack={onBack} rightEl={
        <div style={{ display: "flex", gap: 4, background: "#F0FDFA", borderRadius: 12, padding: 3 }}>
          {["timeline", "calendar"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 14px", borderRadius: 9, border: "none", cursor: "pointer",
              background: view === v ? TEAL : "transparent",
              color: view === v ? "#fff" : "#64748B", fontWeight: 700, fontSize: 13, fontFamily: FONT
            }}>{v === "timeline" ? "📋" : "📅"}</button>
          ))}
        </div>
      } />
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 14, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 800, color: "#1E293B", letterSpacing: "-0.2px" }}>Europe Extravaganza</div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>Mar 15 – Mar 29 · {stops.length} cities</div>
          </div>
          <span style={{ fontWeight: 900, fontSize: 17, color: ORANGE }}>₹2,85,000</span>
        </GlassCard>

        {/* Add Stop Button */}
        <Btn variant="ghost" onClick={() => setShowAddStop(!showAddStop)} style={{ width: "100%", marginBottom: 16 }}>
          {showAddStop ? "✕ Cancel" : "+ Add Stop"}
        </Btn>

        {/* Add Stop Form */}
        {showAddStop && (
          <GlassCard style={{ padding: 16, marginBottom: 16, border: `1.5px solid ${TEAL}30` }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1E293B", marginBottom: 12 }}>Add New Stop</div>
            {[
              { key: "city", placeholder: "City name (e.g. Tokyo)", label: "City" },
              { key: "country", placeholder: "Country (e.g. Japan)", label: "Country" },
              { key: "arrival", placeholder: "Arrival date", label: "Arrival", type: "date" },
              { key: "departure", placeholder: "Departure date", label: "Departure", type: "date" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 3 }}>{f.label}</label>
                <input type={f.type || "text"} value={newStop[f.key]} placeholder={f.placeholder}
                  onChange={e => setNewStop({ ...newStop, [f.key]: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, fontFamily: FONT, boxSizing: "border-box", outline: "none" }}
                />
              </div>
            ))}
            <Btn style={{ width: "100%" }} onClick={addStop}>Add Stop ✓</Btn>
          </GlassCard>
        )}

        {view === "timeline" && (
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 2, background: `linear-gradient(${TEAL},${ACCENT})`, opacity: 0.4 }} />
            {stops.map((s, i) => (
              <div key={s.id} style={{ display: "flex", gap: 14, marginBottom: 20, position: "relative" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, flexShrink: 0, zIndex: 1, boxShadow: `0 0 0 4px #E0F2F1` }}>{i + 1}</div>
                <GlassCard style={{ flex: 1, padding: 14 }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <img src={s.img} alt="" style={{ width: 62, height: 62, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 900, fontSize: 16, color: "#1E293B", letterSpacing: "-0.2px" }}>{s.city}</div>
                      <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{s.country}</div>
                      <div style={{ fontSize: 12, color: TEAL, fontWeight: 700, marginTop: 2 }}>{s.arrival} → {s.departure}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{ fontWeight: 800, color: ORANGE, fontSize: 13 }}>{s.budget}</span>
                      <button onClick={() => removeStop(s.id)} style={{ background: "#FEE2E2", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: "#EF4444", fontWeight: 600 }}>✕ Remove</button>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid #F0FDFA", paddingTop: 10 }}>
                    <div style={{ fontSize: 12, color: "#64748B", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>Activities</div>
                    {s.activities.map((a, ai) => (
                      <div key={ai} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#334155", flex: 1 }}>{a}</span>
                        <button onClick={() => setStops(prev => prev.map(st => st.id === s.id ? { ...st, activities: st.activities.filter((_, idx) => idx !== ai) } : st))}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#CBD5E1", padding: 0 }}>✕</button>
                      </div>
                    ))}
                    {addActivityFor === s.id ? (
                      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                        <input autoFocus value={newActivity} onChange={e => setNewActivity(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && addActivity(s.id)}
                          placeholder="Activity name…"
                          style={{ flex: 1, padding: "7px 10px", borderRadius: 9, border: `1.5px solid ${TEAL}`, fontSize: 13, fontFamily: FONT, outline: "none" }}
                        />
                        <button onClick={() => addActivity(s.id)} style={{ background: TEAL, border: "none", borderRadius: 9, padding: "7px 14px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add</button>
                        <button onClick={() => { setAddActivityFor(null); setNewActivity(""); }} style={{ background: "#F0FDFA", border: "none", borderRadius: 9, padding: "7px 10px", color: "#64748B", fontSize: 13, cursor: "pointer" }}>✕</button>
                      </div>
                    ) : (
                      <button onClick={() => setAddActivityFor(s.id)} style={{ marginTop: 8, background: TEAL + "12", border: "none", borderRadius: 9, padding: "6px 13px", color: TEAL, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>+ Add Activity</button>
                    )}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        )}

        {view === "calendar" && (
          <GlassCard style={{ padding: 16 }}>
            <div style={{ textAlign: "center", fontWeight: 800, fontSize: 16, color: "#1E293B", marginBottom: 14, letterSpacing: "-0.3px" }}>March 2026</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, textAlign: "center" }}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} style={{ fontSize: 11, color: "#94A3B8", fontWeight: 700, padding: "4px 0" }}>{d}</div>
              ))}
              {[...Array(6)].map((_, i) => <div key={`e${i}`} />)}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isTrip = day >= 15 && day <= 29;
                const isStart = day === 15, isEnd = day === 29;
                return (
                  <div key={day} style={{
                    padding: "7px 4px", borderRadius: 10, textAlign: "center", fontSize: 13,
                    background: isStart || isEnd ? TEAL : isTrip ? TEAL + "20" : "transparent",
                    color: isStart || isEnd ? "#fff" : isTrip ? TEAL : "#334155",
                    fontWeight: isTrip ? 700 : 400
                  }}>{day}</div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 12, justifyContent: "center" }}>
              {stops.map(s => (
                <div key={s.city} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: TEAL }} />
                  <span style={{ fontSize: 12, color: "#64748B" }}>{s.city}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

/* ─── EXPLORE ─── */
function ExploreScreen({ destinations, activities, cityFilter, setCityFilter, activityFilter, setActivityFilter }) {
  const [tab, setTab] = useState("cities");
  const actTypes = ["All", "Sightseeing", "Food", "Adventure", "Cultural", "Shopping"];
  const continents = ["All", "Europe", "Asia", "Beach", "Luxury", "Culture"];

  return (
    <div>
      <TopBar title="Explore 🔍" />
      <div style={{ padding: 16 }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 14px rgba(0,0,0,0.07)", border: "1.5px solid rgba(20,184,166,0.12)", marginBottom: 16 }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <input placeholder="Search cities, activities…" style={{ border: "none", outline: "none", flex: 1, fontSize: 15, fontFamily: FONT, background: "transparent" }} />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["cities", "activities"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px", borderRadius: 12, border: "none", cursor: "pointer",
              background: tab === t ? `linear-gradient(135deg, ${TEAL}, ${ACCENT})` : "#fff",
              color: tab === t ? "#fff" : "#64748B", fontWeight: 800, fontSize: 14, fontFamily: FONT,
              boxShadow: tab === t ? `0 4px 14px ${TEAL}30` : "0 2px 8px rgba(0,0,0,0.05)"
            }}>{t === "cities" ? "🌍 Cities" : "🎭 Activities"}</button>
          ))}
        </div>

        {tab === "cities" && (
          <>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16 }}>
              {continents.map(c => (
                <button key={c} onClick={() => setCityFilter(c)} style={{
                  padding: "7px 15px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: cityFilter === c ? TEAL : "#F0FDFA",
                  color: cityFilter === c ? "#fff" : "#64748B",
                  fontWeight: 700, fontSize: 12, whiteSpace: "nowrap", fontFamily: FONT
                }}>{c}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {destinations.map(d => (
                <GlassCard key={d.name} style={{ overflow: "hidden", cursor: "pointer", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ position: "relative" }}>
                    <img src={d.img} alt="" style={{ width: "100%", height: 110, objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.55))" }} />
                    <div style={{ position: "absolute", top: 8, right: 8, background: ORANGE, borderRadius: 20, padding: "2px 9px", color: "#fff", fontSize: 11, fontWeight: 700 }}>{d.tag}</div>
                    <div style={{ position: "absolute", bottom: 8, left: 10 }}>
                      <div style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{d.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{d.country}</div>
                    </div>
                  </div>
                  <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "#64748B" }}>{d.cost}</span>
                    <Btn small>+ Add</Btn>
                  </div>
                </GlassCard>
              ))}
            </div>
          </>
        )}

        {tab === "activities" && (
          <>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16 }}>
              {actTypes.map(t => (
                <button key={t} onClick={() => setActivityFilter(t)} style={{
                  padding: "7px 15px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: activityFilter === t ? TEAL : "#F0FDFA",
                  color: activityFilter === t ? "#fff" : "#64748B",
                  fontWeight: 700, fontSize: 12, whiteSpace: "nowrap", fontFamily: FONT
                }}>{t}</button>
              ))}
            </div>
            {activities.filter(a => activityFilter === "All" || a.type === activityFilter).map(a => (
              <GlassCard key={a.name} style={{ marginBottom: 12, overflow: "hidden", display: "flex" }}>
                <img src={a.img} alt="" style={{ width: 90, height: 90, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ padding: "12px 14px", flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#1E293B" }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{a.city} · {a.duration}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: ORANGE }}>{a.cost}</span>
                      <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: 6 }}>⭐ {a.rating}</span>
                    </div>
                    <Btn small>+ Add</Btn>
                  </div>
                </div>
              </GlassCard>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── BUDGET ─── */
function BudgetScreen({ expenses, onBack }) {
  const items = [
    { label: "Flights", amount: 85000, color: "#0EA5E9" },
    { label: "Hotels", amount: 95000, color: TEAL },
    { label: "Activities", amount: 45000, color: ORANGE },
    { label: "Food & Transport", amount: 60000, color: ACCENT },
  ];
  const total = items.reduce((s, i) => s + i.amount, 0);
  const expenseTotal = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div>
      <TopBar title="Trip Budget 💰" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 20, textAlign: "center", marginBottom: 16, background: `linear-gradient(135deg, ${TEAL}12, ${ACCENT}08)` }}>
          <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>Total Planned Budget</div>
          <div style={{ fontSize: 44, fontWeight: 900, color: TEAL, letterSpacing: "-1.5px", marginTop: 4 }}>₹{(total / 100000).toFixed(2)}L</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Avg ₹{Math.round(total / 14).toLocaleString("en-IN")} per day</div>
        </GlassCard>

        <GlassCard style={{ padding: 20, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 14, letterSpacing: "-0.2px" }}>Breakdown</div>
          <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto 16px" }}>
            {(() => {
              let offset = 0;
              const circ = 2 * Math.PI * 70;
              return items.map((item, i) => {
                const pct = item.amount / total;
                const dash = pct * circ;
                const el = (
                  <circle key={i} cx="100" cy="100" r="70" fill="none" stroke={item.color} strokeWidth="28"
                    strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset}
                    transform="rotate(-90 100 100)" />
                );
                offset += dash;
                return el;
              });
            })()}
            <text x="100" y="96" textAnchor="middle" style={{ fontSize: 13, fontWeight: 700, fill: "#1E293B" }}>₹2.85L</text>
            <text x="100" y="112" textAnchor="middle" style={{ fontSize: 10, fill: "#64748B" }}>Total</text>
          </svg>
          {items.map(item => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #F0FDFA" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color }} />
                <span style={{ fontSize: 14, color: "#334155" }}>{item.label}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, color: "#1E293B", fontSize: 14 }}>₹{item.amount.toLocaleString("en-IN")}</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>{Math.round(item.amount / total * 100)}%</div>
              </div>
            </div>
          ))}
        </GlassCard>

        {expenses.length > 0 && (
          <GlassCard style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 10 }}>Recent Actual Expenses</div>
            <div style={{ fontSize: 12, color: TEAL, fontWeight: 700, marginBottom: 8 }}>Total spent: ₹{expenseTotal.toLocaleString("en-IN")}</div>
            {expenses.slice(0, 3).map(e => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F0FDFA" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{e.desc}</div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>{e.city} · {e.date}</div>
                </div>
                <span style={{ fontWeight: 800, color: ORANGE, fontSize: 14 }}>₹{e.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </GlassCard>
        )}

        <GlassCard style={{ padding: 14, background: "#FFF7ED", border: "1.5px solid #FED7AA" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "start" }}>
            <span style={{ fontSize: 22 }}>⚠️</span>
            <div>
              <div style={{ fontWeight: 800, color: "#C2410C", fontSize: 14 }}>Accommodation tip</div>
              <div style={{ fontSize: 13, color: "#7C2D12", marginTop: 3 }}>Hotel costs are 5% over your planned budget. Consider hostels in Amsterdam to save ₹8,000.</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ─── PACKING ─── */
function PackingScreen({ items, setItems, tab, setTab, total, max, onBack }) {
  const [newItem, setNewItem] = useState("");

  const toggleItem = (catKey, id) => {
    setItems(prev => ({ ...prev, [catKey]: prev[catKey].map(i => i.id === id ? { ...i, packed: !i.packed } : i) }));
  };
  const deleteItem = (catKey, id) => {
    setItems(prev => ({ ...prev, [catKey]: prev[catKey].filter(i => i.id !== id) }));
  };
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems(prev => ({ ...prev, [tab]: [...prev[tab], { id: Date.now(), name: newItem, packed: false }] }));
    setNewItem("");
  };

  return (
    <div>
      <TopBar title="Packing Checklist 🎒" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: "#334155" }}>{total} of {max} items packed</span>
            <span style={{ fontWeight: 800, color: TEAL }}>{Math.round(total / max * 100)}%</span>
          </div>
          <div style={{ height: 10, background: "#F0FDFA", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${total / max * 100}%`, background: `linear-gradient(90deg,${TEAL},${ACCENT})`, borderRadius: 10, transition: "width 0.4s" }} />
          </div>
        </GlassCard>

        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16 }}>
          {Object.keys(items).map(cat => (
            <button key={cat} onClick={() => setTab(cat)} style={{
              padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
              background: tab === cat ? TEAL : "#F0FDFA", color: tab === cat ? "#fff" : "#64748B",
              fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", fontFamily: FONT
            }}>{cat}</button>
          ))}
        </div>

        <GlassCard style={{ padding: 4, marginBottom: 14 }}>
          {items[tab].map(item => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "13px 16px",
              borderBottom: "1px solid #F0FDFA", background: item.packed ? "#F0FDFA05" : "#fff",
              transition: "background 0.2s", borderRadius: 12
            }}>
              <div onClick={() => toggleItem(tab, item.id)} style={{
                width: 24, height: 24, borderRadius: "50%",
                border: `2px solid ${item.packed ? TEAL : "#CBD5E1"}`,
                background: item.packed ? TEAL : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0, cursor: "pointer"
              }}>
                {item.packed && <span style={{ color: "#fff", fontSize: 13, fontWeight: 800 }}>✓</span>}
              </div>
              <span onClick={() => toggleItem(tab, item.id)} style={{ flex: 1, fontSize: 15, color: item.packed ? "#94A3B8" : "#1E293B", textDecoration: item.packed ? "line-through" : "none", cursor: "pointer" }}>{item.name}</span>
              <span onClick={() => deleteItem(tab, item.id)} style={{ fontSize: 18, cursor: "pointer", color: "#E2E8F0" }}>🗑</span>
            </div>
          ))}
        </GlassCard>

        <div style={{ display: "flex", gap: 8 }}>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem()}
            placeholder={`Add item to ${tab}…`}
            style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${TEAL}`, fontSize: 14, fontFamily: FONT, outline: "none" }}
          />
          <Btn onClick={addItem} variant="orange">+ Add</Btn>
        </div>
      </div>
    </div>
  );
}

/* ─── NOTES ─── */
function NotesScreen({ notes, setNotes, noteText, setNoteText, onBack }) {
  const [editId, setEditId] = useState(null);

  const addNote = () => {
    if (!noteText.trim()) return;
    if (editId) {
      setNotes(prev => prev.map(n => n.id === editId ? { ...n, title: noteText.slice(0, 40), content: noteText, date: "May 10, 2026" } : n));
      setEditId(null);
    } else {
      setNotes(prev => [{ id: Date.now(), title: noteText.slice(0, 40), content: noteText, date: "May 10, 2026", stop: null }, ...prev]);
    }
    setNoteText("");
  };

  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  return (
    <div>
      <TopBar title="Trip Journal 📝" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 16, marginBottom: 16 }}>
          <textarea placeholder="Write a note or reminder…" value={noteText} onChange={e => setNoteText(e.target.value)} rows={3}
            style={{ width: "100%", border: "none", outline: "none", fontSize: 15, fontFamily: FONT, resize: "none", background: "transparent", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {editId && <Btn small variant="outline" onClick={() => { setEditId(null); setNoteText(""); }}>Cancel</Btn>}
            <Btn small onClick={addNote}>{editId ? "Update ✓" : "Save Note ✓"}</Btn>
          </div>
        </GlassCard>

        {notes.map(n => (
          <GlassCard key={n.id} style={{ padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", flex: 1 }}>{n.title}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { setEditId(n.id); setNoteText(n.content); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>✏️</button>
                <button onClick={() => deleteNote(n.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>🗑</button>
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#475569", margin: "6px 0", lineHeight: 1.5 }}>{n.content}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#94A3B8" }}>📅 {n.date}</span>
              {n.stop && <Badge color={ACCENT}>{n.stop}</Badge>}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ─── SHARED VIEW ─── */
function SharedView({ trip, stops, onBack }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img src={trip.cover} alt="" style={{ width: "100%", height: 230, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 25%,rgba(0,0,0,0.70))" }} />
        <button onClick={onBack} style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 10, width: 38, height: 38, cursor: "pointer", fontSize: 18 }}>←</button>
        <div style={{ position: "absolute", bottom: 16, left: 18, right: 18 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 24, letterSpacing: "-0.5px" }}>{trip.name}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 3 }}>by Harsh Parmar · {trip.start} – {trip.end}</div>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 14, display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>🔗</span>
          <span style={{ fontSize: 13, color: "#64748B", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>traveloop.in/t/europe-extravaganza-2026</span>
          <Btn small onClick={handleCopy}>{copied ? "Copied! ✓" : "Copy"}</Btn>
        </GlassCard>

        <div style={{ fontWeight: 800, fontSize: 16, color: "#0F172A", marginBottom: 12 }}>Full Itinerary</div>
        {stops.map((s, i) => (
          <GlassCard key={s.city} style={{ marginBottom: 10, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
            <img src={s.img} alt="" style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B" }}>{s.city}, {s.country}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{s.arrival} – {s.departure} · {s.activities.length} activities</div>
            </div>
          </GlassCard>
        ))}

        <Btn style={{ width: "100%", marginTop: 10 }} variant="orange">📋 Copy This Trip</Btn>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16 }}>
          {["📱 WhatsApp", "🐦 Twitter", "📸 Instagram"].map(s => (
            <button key={s} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#64748B", fontFamily: FONT }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PROFILE ─── */
function ProfileScreen() {
  return (
    <div>
      <TopBar title="Profile & Settings" />
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 22, textAlign: "center", marginBottom: 16 }}>
          <div style={{ width: 82, height: 82, borderRadius: "50%", background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 30, margin: "0 auto 14px", boxShadow: `0 8px 24px ${TEAL}40` }}>H</div>
          <div style={{ fontWeight: 900, fontSize: 21, color: "#0F172A", letterSpacing: "-0.5px" }}>Harsh Parmar</div>
          <div style={{ color: "#64748B", fontSize: 14, marginTop: 3 }}>harsh@traveloop.in</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            <Badge>🇮🇳 India</Badge>
            <Badge>💰 INR</Badge>
            <Badge>🌐 English</Badge>
          </div>
        </GlassCard>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Trips", value: "12", icon: "✈️" },
            { label: "Countries", value: "8", icon: "🌍" },
            { label: "Saved", value: "18", icon: "❤️" },
          ].map(s => (
            <GlassCard key={s.label} style={{ padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 20, color: TEAL }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#64748B" }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>

        {[
          { icon: "✏️", label: "Edit Profile" },
          { icon: "🔔", label: "Notifications" },
          { icon: "💰", label: "Currency: INR" },
          { icon: "🌙", label: "Dark Mode" },
          { icon: "🔒", label: "Privacy & Security" },
          { icon: "❓", label: "Help & Support" },
          { icon: "🚪", label: "Logout", red: true },
        ].map(item => (
          <GlassCard key={item.label} style={{ padding: "14px 18px", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 15, color: item.red ? "#EF4444" : "#1E293B" }}>{item.label}</span>
            </div>
            {!item.red && <span style={{ color: "#CBD5E1", fontSize: 18 }}>›</span>}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ─── ADMIN DASHBOARD ─── */
function AdminDashboard({ onBack }) {
  const cityData = [
    { city: "Paris", trips: 145, bar: 95 },
    { city: "Bali", trips: 132, bar: 86 },
    { city: "Tokyo", trips: 118, bar: 77 },
    { city: "Dubai", trips: 97, bar: 63 },
    { city: "Rome", trips: 85, bar: 55 },
  ];
  return (
    <div>
      <TopBar title="Admin Dashboard 📊" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Total Trips", value: "1,248", icon: "✈️", color: TEAL },
            { label: "Active Users", value: "3,842", icon: "👤", color: ORANGE },
            { label: "Cities Listed", value: "142", icon: "🌍", color: ACCENT },
            { label: "Revenue", value: "₹12.4L", icon: "💰", color: "#8B5CF6" },
          ].map(s => (
            <GlassCard key={s.label} style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 26 }}>{s.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 22, color: s.color, letterSpacing: "-0.5px", marginTop: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#64748B" }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>

        <GlassCard style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 14 }}>Top Destinations</div>
          {cityData.map(d => (
            <div key={d.city} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>{d.city}</span>
                <span style={{ fontSize: 13, color: "#64748B" }}>{d.trips} trips</span>
              </div>
              <div style={{ height: 8, background: "#F0FDFA", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${d.bar}%`, background: `linear-gradient(90deg,${TEAL},${ACCENT})`, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </GlassCard>

        <GlassCard style={{ padding: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 12 }}>Monthly Trips (2026)</div>
          <div style={{ display: "flex", gap: 5, alignItems: "end", height: 80 }}>
            {[45, 62, 88, 95, 120, 108, 134, 98, 115, 140, 88, 60].map((v, i) => (
              <div key={i} style={{ flex: 1, background: i === 4 ? ORANGE : `${TEAL}50`, borderRadius: "4px 4px 0 0", height: `${v / 140 * 100}%`, position: "relative" }}>
                {i === 4 && <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 700, color: ORANGE, whiteSpace: "nowrap" }}>{v}</div>}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 4 }}>
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#94A3B8" }}>{m}</div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ─── RESERVATIONS ─── */
function ReservationsScreen({ reservations, setReservations, onBack }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ type: "flight", title: "", detail: "" });

  const typeOptions = [
    { key: "flight", icon: "✈️", label: "Flight", color: "#0EA5E9" },
    { key: "hotel", icon: "🏨", label: "Hotel", color: TEAL },
    { key: "train", icon: "🚆", label: "Train", color: ORANGE },
    { key: "car", icon: "🚗", label: "Car Rental", color: "#8B5CF6" },
    { key: "activity", icon: "🎭", label: "Activity", color: "#10B981" },
  ];

  const addReservation = () => {
    if (!form.title.trim()) return;
    const typeInfo = typeOptions.find(t => t.key === form.type);
    setReservations(prev => [...prev, { id: Date.now(), type: form.type, icon: typeInfo.icon, title: form.title, detail: form.detail, status: "Pending", color: typeInfo.color }]);
    setForm({ type: "flight", title: "", detail: "" });
    setShowAdd(false);
  };

  const deleteReservation = (id) => setReservations(prev => prev.filter(r => r.id !== id));
  const toggleStatus = (id) => setReservations(prev => prev.map(r => r.id === id ? { ...r, status: r.status === "Confirmed" ? "Pending" : "Confirmed" } : r));

  return (
    <div>
      <TopBar title="Reservations 🎫" onBack={onBack} rightEl={<Btn small onClick={() => setShowAdd(!showAdd)}>+ Add</Btn>} />
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 14, marginBottom: 16, background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", border: "1.5px solid #BFDBFE", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>📧</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: "#1D4ED8", fontSize: 14 }}>Import from Email</div>
            <div style={{ fontSize: 12, color: "#3B82F6" }}>Auto-detect flights, hotels & bookings</div>
          </div>
          <Btn small style={{ background: "#2563EB" }}>Import</Btn>
        </GlassCard>

        {showAdd && (
          <GlassCard style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 12 }}>Add Reservation</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12 }}>
              {typeOptions.map(t => (
                <button key={t.key} onClick={() => setForm({ ...form, type: t.key })} style={{
                  padding: "6px 12px", borderRadius: 20, border: `2px solid ${form.type === t.key ? t.color : "#E2E8F0"}`,
                  background: form.type === t.key ? t.color + "15" : "#fff", cursor: "pointer",
                  fontSize: 13, fontWeight: 700, color: form.type === t.key ? t.color : "#64748B",
                  whiteSpace: "nowrap", fontFamily: FONT
                }}>{t.icon} {t.label}</button>
              ))}
            </div>
            {[
              { key: "title", placeholder: "Title (e.g. Air India AI-131)" },
              { key: "detail", placeholder: "Details (e.g. Mumbai → Dubai · Jun 5, 8:00 AM)" },
            ].map(f => (
              <input key={f.key} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, fontFamily: FONT, boxSizing: "border-box", marginBottom: 10, outline: "none" }}
              />
            ))}
            <div style={{ display: "flex", gap: 8 }}>
              <Btn style={{ flex: 1 }} onClick={addReservation}>Add ✓</Btn>
              <Btn variant="outline" style={{ flex: 1 }} onClick={() => setShowAdd(false)}>Cancel</Btn>
            </div>
          </GlassCard>
        )}

        {typeOptions.map(typeInfo => {
          const filtered = reservations.filter(r => r.type === typeInfo.key);
          if (!filtered.length) return null;
          return (
            <div key={typeInfo.key} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 800, fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>{typeInfo.icon} {typeInfo.label}s</div>
              {filtered.map(r => (
                <GlassCard key={r.id} style={{ padding: 14, marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: r.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{r.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B" }}>{r.title}</div>
                      <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{r.detail}</div>
                      <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                        <button onClick={() => toggleStatus(r.id)} style={{
                          padding: "4px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700,
                          background: r.status === "Confirmed" ? "#D1FAE5" : "#FEF3C7",
                          color: r.status === "Confirmed" ? "#059669" : "#D97706", fontFamily: FONT
                        }}>
                          {r.status === "Confirmed" ? "✓ Confirmed" : "⏳ Pending"}
                        </button>
                        <button onClick={() => deleteReservation(r.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#CBD5E1" }}>🗑</button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── WEATHER ─── */
function WeatherScreen({ stops, onBack }) {
  const [selected, setSelected] = useState(stops[0]?.city || "Paris");
  const weather = WEATHER_DATA[selected] || { temp: 20, icon: "🌤️", desc: "Mild", humidity: 60, wind: "10 km/h" };

  const tips = {
    Paris: "Pack a light jacket — evenings can be chilly in March.",
    Rome: "Perfect weather for sightseeing! Light layers recommended.",
    Barcelona: "Warm and pleasant. Bring sunscreen.",
    Amsterdam: "Rain expected — pack an umbrella and waterproof jacket!",
    Bali: "Tropical heat. Light breathable clothing + mosquito repellent.",
    Tokyo: "Cherry blossom season — mild but bring a light sweater.",
    Dubai: "Very hot. Light loose clothing, stay hydrated.",
  };

  return (
    <div>
      <TopBar title="Weather Forecast 🌤️" onBack={onBack} />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16 }}>
          {stops.map(s => (
            <button key={s.city} onClick={() => setSelected(s.city)} style={{
              padding: "8px 18px", borderRadius: 20, border: `2px solid ${selected === s.city ? TEAL : "#E2E8F0"}`,
              background: selected === s.city ? TEAL : "#fff",
              color: selected === s.city ? "#fff" : "#64748B",
              fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontFamily: FONT
            }}>{s.city}</button>
          ))}
        </div>

        <GlassCard style={{ padding: 28, textAlign: "center", marginBottom: 16, background: `linear-gradient(135deg, ${TEAL}12, ${ACCENT}08)` }}>
          <div style={{ fontSize: 74 }}>{weather.icon}</div>
          <div style={{ fontSize: 54, fontWeight: 900, color: TEAL, letterSpacing: "-2px", marginTop: 4 }}>{weather.temp}°C</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#1E293B", marginTop: 4 }}>{selected}</div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 2 }}>{weather.desc}</div>
        </GlassCard>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            { icon: "💧", label: "Humidity", value: weather.humidity + "%" },
            { icon: "💨", label: "Wind", value: weather.wind },
            { icon: "🌡️", label: "Feels Like", value: (weather.temp - 2) + "°C" },
            { icon: "🌅", label: "Sunrise", value: "06:32 AM" },
          ].map(s => (
            <GlassCard key={s.label} style={{ padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#1E293B" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#64748B" }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>

        <GlassCard style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 12 }}>5-Day Forecast</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { day: "Mon", icon: weather.icon, hi: weather.temp + 1, lo: weather.temp - 4 },
              { day: "Tue", icon: "🌤️", hi: weather.temp + 2, lo: weather.temp - 3 },
              { day: "Wed", icon: "☁️", hi: weather.temp - 1, lo: weather.temp - 5 },
              { day: "Thu", icon: "🌧️", hi: weather.temp - 2, lo: weather.temp - 6 },
              { day: "Fri", icon: "☀️", hi: weather.temp + 3, lo: weather.temp - 2 },
            ].map(d => (
              <div key={d.day} style={{ flex: 1, textAlign: "center", padding: "10px 4px", borderRadius: 12, background: "#F8FAFC" }}>
                <div style={{ fontSize: 10, color: "#64748B", fontWeight: 700, marginBottom: 4 }}>{d.day}</div>
                <div style={{ fontSize: 22 }}>{d.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginTop: 4 }}>{d.hi}°</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>{d.lo}°</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 14, background: "#F0FDF4", border: "1.5px solid #BBF7D0" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "start" }}>
            <span style={{ fontSize: 22 }}>👜</span>
            <div>
              <div style={{ fontWeight: 800, color: "#15803D", fontSize: 14 }}>Packing Tip for {selected}</div>
              <div style={{ fontSize: 13, color: "#166534", marginTop: 4, lineHeight: 1.5 }}>{tips[selected] || "Pack appropriately for the local climate."}</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ─── EXPENSE TRACKER ─── */
function ExpenseTracker({ expenses, setExpenses, onBack }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ desc: "", city: "", amount: "", cat: "Food" });
  const cats = ["Food", "Transport", "Activities", "Shopping", "Stay", "Other"];
  const catColors = { Food: "#F59E0B", Transport: "#3B82F6", Activities: "#8B5CF6", Shopping: ORANGE, Stay: TEAL, Other: "#94A3B8" };
  const catIcons = { Food: "🍜", Transport: "🚌", Activities: "🎭", Shopping: "🛍️", Stay: "🏨", Other: "💸" };

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCity = expenses.reduce((acc, e) => { acc[e.city] = (acc[e.city] || 0) + e.amount; return acc; }, {});

  const addExpense = () => {
    if (!form.desc.trim() || !form.amount) return;
    setExpenses(prev => [...prev, { id: Date.now(), desc: form.desc, city: form.city || "General", amount: parseInt(form.amount), cat: form.cat, date: "May 10" }]);
    setForm({ desc: "", city: "", amount: "", cat: "Food" });
    setShowAdd(false);
  };

  return (
    <div>
      <TopBar title="Expense Tracker 💳" onBack={onBack} rightEl={<Btn small onClick={() => setShowAdd(!showAdd)}>+ Add</Btn>} />
      <div style={{ padding: 16 }}>
        <GlassCard style={{ padding: 22, textAlign: "center", marginBottom: 16, background: `linear-gradient(135deg, ${TEAL}12, ${ACCENT}08)` }}>
          <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>Total Spent</div>
          <div style={{ fontSize: 44, fontWeight: 900, color: TEAL, letterSpacing: "-1.5px", marginTop: 4 }}>₹{total.toLocaleString("en-IN")}</div>
          <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>{expenses.length} transactions · Avg ₹{expenses.length ? Math.round(total / expenses.length).toLocaleString("en-IN") : 0}</div>
        </GlassCard>

        {showAdd && (
          <GlassCard style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 12 }}>Add Expense</div>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 10 }}>
              {cats.map(c => (
                <button key={c} onClick={() => setForm({ ...form, cat: c })} style={{
                  padding: "5px 12px", borderRadius: 20, border: `2px solid ${form.cat === c ? catColors[c] : "#E2E8F0"}`,
                  background: form.cat === c ? catColors[c] + "20" : "#fff",
                  color: form.cat === c ? catColors[c] : "#64748B",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: FONT
                }}>{catIcons[c]} {c}</button>
              ))}
            </div>
            {[
              { key: "desc", placeholder: "Description (e.g. Dinner at La Piazza)", label: "What" },
              { key: "city", placeholder: "City (e.g. Rome)", label: "Where" },
              { key: "amount", placeholder: "Amount in ₹", label: "How much", type: "number" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 4 }}>{f.label}</label>
                <input type={f.type || "text"} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, fontFamily: FONT, boxSizing: "border-box", outline: "none" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 8 }}>
              <Btn style={{ flex: 1 }} onClick={addExpense}>Add Expense ✓</Btn>
              <Btn variant="outline" style={{ flex: 1 }} onClick={() => setShowAdd(false)}>Cancel</Btn>
            </div>
          </GlassCard>
        )}

        {Object.keys(byCity).length > 0 && (
          <GlassCard style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 10 }}>By City</div>
            {Object.entries(byCity).sort((a, b) => b[1] - a[1]).map(([city, amt]) => (
              <div key={city} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>📍 {city}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: ORANGE }}>₹{amt.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ height: 6, background: "#F0FDFA", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(amt / total) * 100}%`, background: `linear-gradient(90deg,${TEAL},${ACCENT})`, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </GlassCard>
        )}

        <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 10 }}>All Transactions</div>
        {expenses.length === 0 && (
          <GlassCard style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 42 }}>💳</div>
            <div style={{ color: "#94A3B8", fontSize: 14, marginTop: 10 }}>No expenses yet. Tap + Add to start tracking!</div>
          </GlassCard>
        )}
        {expenses.map(e => (
          <GlassCard key={e.id} style={{ padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: (catColors[e.cat] || "#94A3B8") + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
              {catIcons[e.cat] || "💸"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#1E293B" }}>{e.desc}</div>
              <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{e.city} · {e.date}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 900, color: "#1E293B", fontSize: 15 }}>₹{e.amount.toLocaleString("en-IN")}</div>
              <button onClick={() => setExpenses(prev => prev.filter(x => x.id !== e.id))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#CBD5E1" }}>🗑</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ─── MAGIC ITINERARY (REAL AI) ─── */
function MagicItinerary({ stops, onBack }) {
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [selectedPlans, setSelectedPlans] = useState(new Set());
  const [error, setError] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const loadMessages = [
    "🧠 Analyzing your destinations…",
    "⭐ Finding top-rated experiences…",
    "🗺️ Optimizing your route…",
    "✨ Crafting your perfect plan…"
  ];

  const generate = async () => {
    setLoading(true);
    setError(null);
    setGenerated(null);
    setSelectedPlans(new Set());

    let step = 0;
    setLoadMsg(loadMessages[0]);
    const msgInterval = setInterval(() => {
      step = Math.min(step + 1, loadMessages.length - 1);
      setLoadMsg(loadMessages[step]);
    }, 800);

    const citiesList = stops.map(s => `${s.city}, ${s.country}`).join("; ");
    const prompt = `You are a world-class travel planner. Create a personalized day-by-day itinerary for a traveller visiting: ${citiesList}.

For each city, provide:
- 3 time-of-day activities (morning, afternoon, evening) as short, vivid suggestions
- 3 key highlights (e.g. "Budget-optimized", "Best-rated by locals", "Hidden gem")
- A brief AI optimization tip

Return ONLY valid JSON in this exact shape (no markdown, no explanation):
{
  "cities": [
    {
      "city": "Paris",
      "country": "France",
      "days": ["Morning: ...", "Afternoon: ...", "Evening: ..."],
      "highlights": ["...", "...", "..."]
    }
  ],
  "optimizationTip": "..."
}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      clearInterval(msgInterval);

      const text = data.content?.map(i => i.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      // Merge with weather data and images
      const enriched = parsed.cities.map(c => ({
        ...c,
        img: CITY_IMAGES[c.city] || stops.find(s => s.city === c.city)?.img || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=80",
        weather: WEATHER_DATA[c.city] ? `${WEATHER_DATA[c.city].temp}°C · ${WEATHER_DATA[c.city].desc}` : "Check local weather"
      }));

      setGenerated({ cities: enriched, optimizationTip: parsed.optimizationTip });
    } catch (err) {
      clearInterval(msgInterval);
      setError("Couldn't connect to AI. Showing a sample plan instead.");
      // Fallback demo data
      const fallback = stops.map(s => ({
        city: s.city,
        country: s.country,
        img: s.img,
        weather: WEATHER_DATA[s.city] ? `${WEATHER_DATA[s.city].temp}°C · ${WEATHER_DATA[s.city].desc}` : "Check local weather",
        days: ["Morning: Explore the iconic landmarks at sunrise", "Afternoon: Visit top-rated museums & local markets", "Evening: Authentic local dinner experience"],
        highlights: ["Best-rated by travellers", "Budget-optimized", "Time-efficient route"]
      }));
      setGenerated({ cities: fallback, optimizationTip: "Start with your westernmost city and travel east for optimal weather and fewer crowds." });
    }
    setLoading(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", content: userMsg }]);
    setChatLoading(true);

    const citiesList = stops.map(s => s.city).join(", ");
    try {
      const msgs = [
        { role: "user", content: `I'm travelling to: ${citiesList}. Answer my question: ${userMsg}` },
        ...chatHistory.slice(-4),
        { role: "user", content: userMsg }
      ];
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Traveloop's AI travel assistant. The user is visiting ${citiesList}. Give concise, helpful travel advice. Keep responses under 150 words.`,
          messages: msgs.slice(-6)
        })
      });
      const data = await response.json();
      const reply = data.content?.map(i => i.text || "").join("") || "Sorry, I couldn't get a response right now.";
      setChatHistory(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatHistory(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again!" }]);
    }
    setChatLoading(false);
  };

  return (
    <div>
      <TopBar title="Magic Itinerary ✨" onBack={onBack} />
      <div style={{ padding: 16 }}>
        {/* Hero */}
        <GlassCard style={{ padding: 24, textAlign: "center", marginBottom: 16, background: `linear-gradient(135deg, ${TEAL}15, ${ACCENT}08)`, border: `1.5px solid ${TEAL}25` }}>
          <div style={{ fontSize: 54 }}>🪄</div>
          <div style={{ fontWeight: 900, fontSize: 20, color: "#1E293B", marginTop: 10, letterSpacing: "-0.3px" }}>Real AI-Powered Day Plans</div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 6, lineHeight: 1.6 }}>
            Get a personalized day-by-day plan for each of your {stops.length} stops — powered by Claude AI, tailored to your exact cities.
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
            {stops.map(s => <Badge key={s.city}>{s.city}</Badge>)}
          </div>
          {!generated && !loading && (
            <button onClick={generate} style={{
              marginTop: 20, padding: "14px 36px", borderRadius: 16,
              background: `linear-gradient(135deg, ${TEAL}, ${ACCENT})`,
              color: "#fff", border: "none", fontWeight: 900, fontSize: 16, cursor: "pointer",
              fontFamily: FONT, boxShadow: `0 6px 24px ${TEAL}40`, letterSpacing: "0.01em"
            }}>
              ✨ Generate with AI
            </button>
          )}
        </GlassCard>

        {/* Loading */}
        {loading && (
          <GlassCard style={{ padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: 42, animation: "pulse 1s infinite" }}>🤖</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#1E293B", marginBottom: 6, marginTop: 12 }}>{loadMsg}</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12 }}>
              {loadMessages.map((_, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: TEAL, opacity: i <= loadMessages.indexOf(loadMsg) ? 1 : 0.25, transition: "opacity 0.4s" }} />
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 12 }}>Claude AI is crafting your perfect itinerary…</div>
          </GlassCard>
        )}

        {/* Error */}
        {error && (
          <GlassCard style={{ padding: 14, marginBottom: 16, background: "#FFF7ED", border: "1.5px solid #FED7AA" }}>
            <div style={{ fontSize: 13, color: "#C2410C" }}>⚠️ {error}</div>
          </GlassCard>
        )}

        {/* Generated Plan */}
        {generated && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#1E293B", letterSpacing: "-0.2px" }}>Your Plan is Ready! 🎉</div>
              <button onClick={generate} style={{ background: TEAL + "12", border: "none", borderRadius: 10, padding: "6px 12px", color: TEAL, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>🔄 Regenerate</button>
            </div>

            {generated.cities.map((cityPlan, ci) => (
              <GlassCard key={cityPlan.city + ci} style={{ marginBottom: 16, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 110 }}>
                  <img src={cityPlan.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 20%, rgba(0,0,0,0.68))" }} />
                  <div style={{ position: "absolute", bottom: 10, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 900, fontSize: 19, letterSpacing: "-0.3px" }}>{cityPlan.city}</div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{cityPlan.country}</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", borderRadius: 9, padding: "4px 11px" }}>
                      <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{cityPlan.weather}</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#94A3B8", marginBottom: 12, textTransform: "uppercase", letterSpacing: "1px" }}>AI Suggested Day Plan</div>
                  {cityPlan.days.map((dayItem, di) => (
                    <div key={di} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 11 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: [TEAL, ORANGE, ACCENT][di % 3] + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                        {["🌅", "☀️", "🌆"][di]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: "#334155", fontWeight: 500, lineHeight: 1.5 }}>{dayItem}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, borderTop: "1px solid #F0FDFA", paddingTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {cityPlan.highlights.map(h => (
                      <span key={h} style={{ background: TEAL + "10", color: TEAL, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>✓ {h}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <Btn small style={{ width: "100%", background: selectedPlans.has(cityPlan.city) ? "#F0FDFA" : undefined, color: selectedPlans.has(cityPlan.city) ? TEAL : undefined }}
                      variant={selectedPlans.has(cityPlan.city) ? "ghost" : "primary"}
                      onClick={() => setSelectedPlans(prev => { const n = new Set(prev); n.has(cityPlan.city) ? n.delete(cityPlan.city) : n.add(cityPlan.city); return n; })}>
                      {selectedPlans.has(cityPlan.city) ? "✓ Added to Itinerary" : "+ Add to Itinerary"}
                    </Btn>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* AI Tip */}
            {generated.optimizationTip && (
              <GlassCard style={{ padding: 16, background: "#FFF7ED", border: "1.5px solid #FED7AA", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "start" }}>
                  <span style={{ fontSize: 24 }}>💡</span>
                  <div>
                    <div style={{ fontWeight: 800, color: "#C2410C", fontSize: 14 }}>AI Route Optimization Tip</div>
                    <div style={{ fontSize: 13, color: "#7C2D12", marginTop: 5, lineHeight: 1.5 }}>{generated.optimizationTip}</div>
                  </div>
                </div>
              </GlassCard>
            )}

            <Btn style={{ width: "100%", marginBottom: 20 }} variant="orange">
              🚀 Apply This Plan to My Trip
            </Btn>
          </>
        )}

        {/* AI Chat Assistant */}
        <GlassCard style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#1E293B", marginBottom: 4, letterSpacing: "-0.2px" }}>🤖 Ask AI Travel Assistant</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 14 }}>Powered by Claude — ask anything about your trip</div>

          {chatHistory.length > 0 && (
            <div style={{ maxHeight: 260, overflowY: "auto", marginBottom: 12 }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", gap: 8, marginBottom: 10,
                  flexDirection: msg.role === "user" ? "row-reverse" : "row"
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: msg.role === "user" ? ORANGE : TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                    {msg.role === "user" ? "H" : "🤖"}
                  </div>
                  <div style={{
                    maxWidth: "78%", padding: "10px 13px", borderRadius: 14,
                    background: msg.role === "user" ? ORANGE + "15" : "#F0FDFA",
                    fontSize: 13, color: "#334155", lineHeight: 1.5,
                    borderBottomRightRadius: msg.role === "user" ? 4 : 14,
                    borderBottomLeftRadius: msg.role === "assistant" ? 4 : 14,
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
                  <div style={{ padding: "10px 13px", borderRadius: 14, background: "#F0FDFA", fontSize: 13, color: "#94A3B8" }}>Thinking…</div>
                </div>
              )}
            </div>
          )}

          {chatHistory.length === 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {["Best time to visit?", "Local food must-tries?", "Budget tips?", "Hidden gems?"].map(q => (
                <button key={q} onClick={() => { setChatInput(q); }} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${TEAL}30`, background: TEAL + "08", color: TEAL, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>{q}</button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendChat()}
              placeholder="Ask anything about your trip…"
              style={{ flex: 1, padding: "11px 14px", borderRadius: 12, border: `1.5px solid ${TEAL}30`, fontSize: 14, fontFamily: FONT, outline: "none" }}
            />
            <Btn onClick={sendChat} disabled={chatLoading || !chatInput.trim()} small>
              {chatLoading ? "…" : "Send"}
            </Btn>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
