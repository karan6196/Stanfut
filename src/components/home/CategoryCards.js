import { useNavigate } from "react-router-dom";
import { Bike, Car, Zap, MapPin } from "lucide-react";
import "./category.css";

export default function CategoryCards() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Bikes",
      icon: <Bike size={34} strokeWidth={1.8} />,
      type: "bike",
      gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)",
      desc: "Perfect for city rides",
    },
    {
      title: "Cars",
      icon: <Car size={34} strokeWidth={1.8} />,
      type: "car",
      gradient: "linear-gradient(135deg,#6366f1,#3b82f6)",
      desc: "Comfort & family trips",
    },
    {
      title: "EVs",
      icon: <Zap size={34} strokeWidth={1.8} />,
      type: "ev",
      gradient: "linear-gradient(135deg,#06b6d4,#10b981)",
      desc: "Eco-friendly rides",
    },
    {
      title: "Near You",
      icon: <MapPin size={34} strokeWidth={1.8} />,
      type: "",
      gradient: "linear-gradient(135deg,#0ea5e9,#22c55e)",
      desc: "Available nearby",
    },
  ];

  return (
    <div style={{ marginTop: "28px" }}>
      <div style={head}>
        <h2 style={{ margin: 0 }}>Browse Categories</h2>
        <span className="small">Instant search</span>
      </div>

      <div style={grid}>
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="category-card"
            style={{
              ...card,
              background: cat.gradient,
            }}
            onClick={() =>
              navigate(cat.type ? `/vehicles?type=${cat.type}` : "/vehicles")
            }
          >
            <div style={overlay}></div>

            <div style={iconWrap}>{cat.icon}</div>

            <div style={{ flex: 1, marginLeft: "16px" }}>
              <h3 style={title}>{cat.title}</h3>
              <p style={desc}>{cat.desc}</p>
            </div>

            <div className="arrow" style={arrow}>
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const head = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const grid = {
  marginTop: "18px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "20px",
};

const card = {
  position: "relative",
  borderRadius: "22px",
  padding: "22px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
  transition: "all 0.35s cubic-bezier(.2,.8,.2,1)",
  overflow: "hidden",
};

const overlay = {
  position: "absolute",
  inset: 0,
  borderRadius: "22px",
  background:
    "radial-gradient(circle at top right, rgba(255,255,255,0.25), transparent 60%)",
  pointerEvents: "none",
};

const iconWrap = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
};

const title = {
  margin: 0,
  fontWeight: 800,
  fontSize: "18px",
  zIndex: 1,
};

const desc = {
  margin: "4px 0 0",
  opacity: 0.9,
  fontSize: "13px",
  zIndex: 1,
};

const arrow = {
  fontSize: "20px",
  fontWeight: "bold",
  transition: "transform 0.3s ease",
  zIndex: 1,
};