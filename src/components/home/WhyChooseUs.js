import { IndianRupee, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";
import "./whychoose.css";

export default function WhyChooseUs() {
  const items = [
    {
      icon: <IndianRupee size={34} strokeWidth={1.8} />,
      title: "Transparent Pricing",
      desc: "No hidden charges ever",
      gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)",
    },
    {
      icon: <ShieldCheck size={34} strokeWidth={1.8} />,
      title: "Insurance Included",
      desc: "Safe rides guaranteed",
      gradient: "linear-gradient(135deg,#6366f1,#3b82f6)",
    },
    {
      icon: <Headphones size={34} strokeWidth={1.8} />,
      title: "24×7 Support",
      desc: "Always here for you",
      gradient: "linear-gradient(135deg,#0ea5e9,#22c55e)",
    },
    {
      icon: <BadgeCheck size={34} strokeWidth={1.8} />,
      title: "Verified Vehicles",
      desc: "Trusted partners only",
      gradient: "linear-gradient(135deg,#06b6d4,#10b981)",
    },
  ];

  return (
    <div style={{ marginTop: "36px" }}>
      <h2 style={heading}>Why Choose STANFUT?</h2>

      <div style={grid}>
        {items.map((x) => (
          <div
            key={x.title}
            className="why-card"
            style={{
              ...card,
              background: x.gradient,
            }}
          >
            <div style={overlay}></div>

            <div style={iconWrap}>{x.icon}</div>
            <h3 style={title}>{x.title}</h3>
            <p style={desc}>{x.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const heading = {
  marginBottom: "20px",
  fontSize: "32px",
  fontWeight: 800,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "22px",
};

const card = {
  position: "relative",
  padding: "24px",
  borderRadius: "22px",
  color: "#fff",
  boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
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
  marginBottom: "14px",
  zIndex: 1,
};

const title = {
  margin: "8px 0 6px",
  fontWeight: 800,
  fontSize: "18px",
  zIndex: 1,
};

const desc = {
  margin: 0,
  opacity: 0.9,
  fontSize: "14px",
  zIndex: 1,
};