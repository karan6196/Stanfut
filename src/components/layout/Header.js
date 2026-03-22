import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "../BrandLogo";
import { useAuthUI } from "../context/AuthUIContext";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const navItems = user?.role === "partner"
  ? [
      { label: "Dashboard", path: "/partner" },
      { label: "My Vehicles", path: "/partner/vehicles" },
      { label: "Contact", path: "/contact" },
    ]
  : [
      { label: "Home", path: "/" },
      { label: "Vehicles", path: "/vehicles" },
      { label: "Bookings", path: "/bookings" },
      { label: "Profile", path: "/profile" },
      { label: "Contact", path: "/contact" },
    ];
  const { openLogin, openSignup } = useAuthUI();
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const name =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "User");

  return (
    <header style={wrap}>
      {/* LEFT SIDE */}
<div
  style={left}
  onClick={() => {
    if (user?.role === "partner") {
      navigate("/partner");
    } else {
      navigate("/");
    }
  }}
>  <BrandLogo size={70} />
</div>

      {/* CENTER NAV */}
      <nav style={center}>
        {navItems.map((item) => (
        <button
  key={item.path}
  style={{
    ...navBtn,
    ...(isActive(item.path) ? activeNavBtn : {}),
  }}
  onClick={() => navigate(item.path)}
  onMouseEnter={(e) => {
    if (!isActive(item.path)) e.target.style.color = "#ffffff";
  }}
  onMouseLeave={(e) => {
    if (!isActive(item.path)) e.target.style.color = "#94a3b8";
  }}
>
  {item.label}
  {isActive(item.path) && <div style={underline} />}
</button>
        ))}
      </nav>

      {/* RIGHT SIDE */}
      <div style={right}>

{!user ? (
  <>
    <button
      style={loginBtn}
      onClick={() => openLogin()}
    >
      Login
    </button>

    <button
      style={signupBtn}
      onClick={() => openSignup()}
    >
      Signup
    </button>
  </>
) : (
  <>
    <div style={userBox}>
      <div style={avatar}>
        {name.charAt(0).toUpperCase()}
      </div>

      <div style={{ lineHeight: 1.2 }}>
        <div style={userName}>{name}</div>
        <div style={userStatus}>Online</div>
      </div>
    </div>

    <button style={logoutBtn} onClick={handleLogout}>
      Logout
    </button>
  </>
)}

</div>
    </header>
  );
}

/* ========================= */
/* STYLES */
/* ========================= */

const wrap = {
  position: "sticky",
  top: 0,
  zIndex: 9999,

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  padding: "18px 28px",

  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(15,23,42,0.9)",
backdropFilter: "blur(6px)",

  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
};

/* LEFT */

const left = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
};

const logoBox = {
  position: "relative",
};

const logoCircle = {
  width: "44px",
  height: "44px",
  borderRadius: "14px",

  background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",

  color: "#fff",
  fontWeight: 900,
  fontSize: "20px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow: "0 8px 18px rgba(29,78,216,0.35)",

  zIndex: 2,
  position: "relative",
};

const logoGlow = {
  position: "absolute",
  inset: "-6px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
  filter: "blur(18px)",
  opacity: 0.25,
};

const brand = {
  fontSize: "18px",
  fontWeight: 900,
  background: "linear-gradient(90deg,#38bdf8,#3b82f6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const tagline = {
  fontSize: "12px",
  color: "#64748b",
};

/* CENTER */

const center = {
  display: "flex",
  alignItems: "center",
  gap: "28px",
};

const navBtn = {
  border: "none",
  background: "transparent",

  padding: "8px 4px",

  fontWeight: 600,
  fontSize: "15px",

  cursor: "pointer",

  color: "#94a3b8",
  position: "relative",

  transition: "all 0.25s ease",
};
const activeNavBtn = {
  color: "#3b82f6",
};
const underline = {
  position: "absolute",
  bottom: "-8px",
  left: 0,
  width: "100%",
  height: "2px",
  background: "linear-gradient(90deg,#3b82f6,#0ea5e9)",
  borderRadius: "2px",
};


/* RIGHT */

const right = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const userBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",

  padding: "6px 12px",
  borderRadius: "12px",

  background: "rgba(255,255,255,0.05)",
};

const avatar = {
  width: "34px",
  height: "34px",

  borderRadius: "10px",

  background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",

  color: "#fff",
  fontWeight: 900,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const userName = {
  fontWeight: 700,
  fontSize: "13px",
  color: "#ffffff",
};

const userStatus = {
  fontSize: "11px",
  color: "#16a34a",
};

const logoutBtn = {
  border: "none",

  padding: "10px 16px",

  borderRadius: "12px",

  fontWeight: 800,

  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "#fff",

  cursor: "pointer",

  boxShadow: "0 6px 16px rgba(239,68,68,0.35)",

  transition: "0.25s",
};

const loginBtn = {
  border: "1px solid rgba(255,255,255,0.2)",
  padding: "10px 18px",
  borderRadius: "12px",
  background: "transparent",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const signupBtn = {
  border: "none",
  padding: "10px 18px",
  borderRadius: "12px",
  background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};