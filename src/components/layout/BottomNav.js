import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "Vehicles", path: "/vehicles", icon: "🚗" },
    { label: "Bookings", path: "/bookings", icon: "📅" },
    { label: "Profile", path: "/profile", icon: "👤" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div style={wrap}>
      <div style={bar}>
        {items.map((x) => (
          <button
            key={x.path}
            onClick={() => navigate(x.path)}
            style={{
              ...btn,
              background: isActive(x.path) ? "rgba(29,78,216,0.10)" : "transparent",
            }}
          >
            <div
              style={{
                ...icon,
                color: isActive(x.path) ? "#1d4ed8" : "#64748b",
              }}
            >
              {x.icon}
            </div>

            <div
              style={{
                ...text,
                color: isActive(x.path) ? "#1d4ed8" : "#64748b",
                fontWeight: isActive(x.path) ? 800 : 600,
              }}
            >
              {x.label}
            </div>

            {isActive(x.path) && <div style={activeDot} />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Styles */
const wrap = {
  position: "sticky",
  bottom: 0,
  zIndex: 999,
  background: "rgba(245,247,251,0.92)",
  backdropFilter: "blur(10px)",
  borderTop: "1px solid rgba(0,0,0,0.06)",
  padding: "10px 12px",
};

const bar = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
};

const btn = {
  border: "none",
  borderRadius: "14px",
  padding: "10px 8px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  position: "relative",
};

const icon = {
  fontSize: "18px",
};

const text = {
  fontSize: "13px",
};

const activeDot = {
  position: "absolute",
  bottom: "6px",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#1d4ed8",
};
