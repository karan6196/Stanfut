import { useNavigate } from "react-router-dom";
import CategoryCards from "../components/home/CategoryCards";
import FeaturedVehicles from "../components/home/FeaturedVehicles";
import WhyChooseUs from "../components/home/WhyChooseUs";

/* ============================
   ICONS
============================ */

const CarIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 13l1-3h16l1 3M5 16a1 1 0 100 2 1 1 0 000-2zm14 0a1 1 0 100 2 1 1 0 000-2zM5 16h14v-3H5v3z"/>
  </svg>
);

const FlashIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"/>
  </svg>
);

const HeadsetIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 12a8 8 0 0116 0v4a2 2 0 01-2 2h-2v-6h4"/>
  </svg>
);

/* ============================
   HOME COMPONENT
============================ */

export default function Home() {
  const navigate = useNavigate();

  const tickerItems = [
    { text: "New Premium Vehicles Added Weekly", icon: <CarIcon /> },
    { text: "Instant Booking Available", icon: <FlashIcon /> },
    { text: "Fully Insured & Verified Cars", icon: <ShieldIcon /> },
    { text: "24/7 Roadside Support", icon: <HeadsetIcon /> }
  ];

  return (
    <>
    
      {/* TICKER */}
      <div style={tickerWrapper}>
        <div style={tickerTrack}>
          {tickerItems.concat(tickerItems).map((item, index) => (
            <div key={index} style={tickerItem}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={heroSection}>
        <div style={heroGlow} />
        <div style={heroGlowRight} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={heroGrid}>
            {/* LEFT CONTENT */}
            <div style={heroLeft}>
              <div style={heroBadge}>
                <span style={badgeDot}></span>
                India’s fastest growing vehicle rental platform
              </div>

              <h1 style={heroTitle}>
                Rent Bikes & Cars <br />
                <span style={heroHighlight}>in seconds</span>
              </h1>

              <p style={heroSubtitle}>
                Verified vehicles • Instant booking • Transparent pricing
              </p>

              <div style={heroButtons}>
                <button
                  style={ctaPrimary}
                  onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 20px 40px rgba(37,99,235,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 12px 30px rgba(37,99,235,0.3)";
                  }}
                >
                  BOOK YOUR RIDE →
                </button>

                <button
                  style={ctaSecondary}
                  onClick={() => navigate("/contact")}
                >
                  CONTACT US
                </button>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div style={visualWrap}>
              <div style={glowCircle} />

              <div
                style={glassCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 60px 100px rgba(0,0,0,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 40px 80px rgba(0,0,0,0.6)";
                }}
              >
                <div style={vehicleHeader}>
                  <span style={liveBadge}>● Available Now</span>
                </div>

                <div style={vehicleBody}>
                  <img
                    src="/images/cab1.png"
                    alt="Rental vehicle"
                    style={vehicleImage}
                  />

                  <h3 style={vehicleTitle}>Book a car</h3>
                  <p style={vehicleSub}>Available near you</p>

                  <div style={priceRow}>
                    <span style={price}>Starting ₹999</span>
                    <span style={perDay}>/day</span>
                  </div>

                  <div
                    style={actionBar}
                    onClick={() => navigate("/vehicles")}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(37,99,235,0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(37,99,235,0.12)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div>
                      <div style={actionTitle}>Instant Booking Available</div>
                      <div style={actionSub}>Tap to explore vehicles</div>
                    </div>
                    <div style={arrowCircle}>→</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        <CategoryCards />
        <FeaturedVehicles />
        <WhyChooseUs />
      </div>
      {/* KEYFRAMES */}
      <style>
        {`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        `}
      </style>
    </>
  );
}

/* ============================
   STYLES
============================ */

const tickerWrapper = {
  width: "100%",
  overflow: "hidden",
  background: "#111827",
  padding: "14px 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)"
};

const tickerTrack = {
  display: "flex",
  width: "fit-content",
  animation: "tickerScroll 20s linear infinite"
};

const tickerItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginRight: "60px",
  color: "#cbd5e1",
  fontSize: "14px",
  whiteSpace: "nowrap"
};

const heroSection = {
  position: "relative",
  padding: "120px 20px 100px",
  overflow: "hidden",
  background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)"
};

const heroGlow = {
  position: "absolute",
  top: "-200px",
  left: "-200px",
  width: "600px",
  height: "600px",
  background: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)",
  filter: "blur(60px)"
};

const heroGlowRight = {
  position: "absolute",
  bottom: "-150px",
  right: "-150px",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%)",
  filter: "blur(80px)"
};

const heroGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "60px",
  alignItems: "center"
};

const heroLeft = { maxWidth: "560px" };

const heroBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "rgba(37,99,235,0.08)",
  color: "#2563eb",
  padding: "6px 14px",
  borderRadius: "999px",
  fontWeight: "600",
  fontSize: "13px",
  marginBottom: "20px"
};

const badgeDot = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#2563eb"
};

const heroTitle = {
  fontSize: "clamp(36px, 6vw, 64px)",
  fontWeight: "900",
  lineHeight: "1.1",
  color: "#e5e7eb",
  margin: 0
};

const heroHighlight = { color: "#3b82f6" };

const heroSubtitle = {
  marginTop: "18px",
  fontSize: "17px",
  color: "#cbd5e1"
};

const heroButtons = {
  marginTop: "36px",
  display: "flex",
  gap: "16px",
  flexWrap: "wrap"
};

const ctaPrimary = {
  padding: "14px 28px",
  borderRadius: "999px",
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#fff",
  border: "none",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 12px 30px rgba(37,99,235,0.3)"
};

const ctaSecondary = {
  padding: "14px 28px",
  borderRadius: "999px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "#e5e7eb",
  fontWeight: "600",
  cursor: "pointer"
};

const visualWrap = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "420px"
};

const glowCircle = {
  position: "absolute",
  width: "380px",
  height: "380px",
  background: "radial-gradient(circle, rgba(37,99,235,0.35), transparent 70%)",
  borderRadius: "50%",
  filter: "blur(40px)",
  animation: "pulseGlow 6s infinite ease-in-out"
};

const glassCard = {
  position: "relative",
  width: "100%",
  maxWidth: "420px",
  padding: "24px",
  borderRadius: "24px",
  background: "rgba(30,41,59,0.75)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
  transition: "all 0.4s ease"
};

const vehicleHeader = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "10px"
};

const liveBadge = {
  fontSize: "12px",
  fontWeight: "600",
  background: "rgba(34,197,94,0.15)",
  color: "#16a34a",
  padding: "6px 12px",
  borderRadius: "999px"
};

const vehicleBody = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center"
};

const vehicleImage = {
  width: "100%",
  height: "190px",
  objectFit: "cover",
  borderRadius: "20px",
  marginBottom: "18px"
};

const vehicleTitle = {
  fontSize: "22px",
  fontWeight: "700"
};

const vehicleSub = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "16px"
};

const priceRow = {
  display: "flex",
  alignItems: "baseline",
  gap: "4px",
  marginBottom: "18px"
};

const price = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#1d4ed8"
};

const perDay = {
  fontSize: "14px",
  color: "#64748b"
};

const actionBar = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "16px",
  background: "rgba(37,99,235,0.12)",
  border: "1px solid rgba(37,99,235,0.3)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.3s ease"
};

const actionTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#ffffff"
};

const actionSub = {
  fontSize: "12px",
  color: "#94a3b8"
};

const arrowCircle = {
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold"
};