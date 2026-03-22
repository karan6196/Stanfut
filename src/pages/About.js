export default function About() {
  return (
    <div style={page}>

      {/* HERO */}
      <section style={hero}>
        <div style={heroGlow}></div>

        <h1 style={heroTitle}>About STANFUT</h1>

        <p style={heroSubtitle}>
          Redefining mobility with speed, safety and seamless technology.
        </p>
      </section>

      <div style={container}>

        {/* MISSION & VISION */}
        <div style={grid}>
          <div
            style={glassCard}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            <h3 style={cardTitle}>Our Mission</h3>
            <p style={cardText}>
              To provide reliable and affordable vehicle rentals powered by a
              modern, technology-first platform that makes booking effortless.
            </p>
          </div>

          <div
            style={glassCard}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            <h3 style={cardTitle}>Our Vision</h3>
            <p style={cardText}>
              To become India’s most trusted and innovative vehicle rental ecosystem.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div style={section}>
          <h2 style={sectionTitle}>Why Choose STANFUT?</h2>

          <div style={featureGrid}>

            <FeatureCard title="Seamless Booking" description="Book in minutes">
              <path d="M3 12h18" />
              <path d="M12 3v18" />
            </FeatureCard>

            <FeatureCard title="Transparent Pricing" description="No hidden fees">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </FeatureCard>

            <FeatureCard title="Secure Payments" description="Safe transactions">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </FeatureCard>

            <FeatureCard title="Trusted Partners" description="Verified vehicles">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12l2 2 4-4" />
            </FeatureCard>

          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={section}>
          <h2 style={sectionTitle}>How STANFUT Works</h2>

          <div style={featureGrid}>

            <FeatureCard title="Search & Select" description="Find nearby vehicles">
              <circle cx="12" cy="12" r="10"/>
            </FeatureCard>

            <FeatureCard title="Book in Seconds" description="Fast checkout">
              <rect x="3" y="6" width="18" height="12"/>
            </FeatureCard>

            <FeatureCard title="Ride Anywhere" description="Pickup or delivery">
              <path d="M12 2 L15 8 L9 8 Z"/>
            </FeatureCard>

          </div>
        </div>

        {/* STATS */}
        <div style={statsSection}>
          <div style={statBox}>
            <h2>1000+</h2>
            <p>Bookings</p>
          </div>

          <div style={statBox}>
            <h2>500+</h2>
            <p>Vehicles</p>
          </div>

          <div style={statBox}>
            <h2>99%</h2>
            <p>Satisfaction</p>
          </div>
        </div>

        {/* CTA */}
        <div style={ctaSection}>
          <h2 style={{ fontSize: "32px", marginBottom: 10 }}>
            Ready to ride?
          </h2>

          <p style={{ opacity: 0.7, marginBottom: 20 }}>
            Book your vehicle in seconds.
          </p>

          <button style={ctaBtn}>
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
}

/* ---------- FEATURE CARD ---------- */

function FeatureCard({ title, description, children }) {
  return (
    <div
      style={featureCard}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      <div style={iconWrap}>
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2"
        >
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          {children}
        </svg>
      </div>

      <h4>{title}</h4>
      <p style={{ opacity: 0.7 }}>{description}</p>
    </div>
  );
}

/* ---------- HOVER ---------- */

const hoverIn = (e) => {
  e.currentTarget.style.transform = "translateY(-10px)";
  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.6)";
};

const hoverOut = (e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "none";
};

/* ---------- STYLES ---------- */

const page = {
  background: "linear-gradient(135deg,#020617,#0f172a)",
  minHeight: "100vh",
  color: "#fff"
};

const hero = {
  padding: "120px 20px 80px",
  textAlign: "center",
  position: "relative"
};

const heroGlow = {
  position: "absolute",
  top: "-100px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)",
  filter: "blur(80px)"
};

const heroTitle = {
  fontSize: "56px",
  fontWeight: 900,
  background: "linear-gradient(135deg,#3b82f6,#22c55e)",
  WebkitBackgroundClip: "text",
  color: "transparent"
};

const heroSubtitle = {
  opacity: 0.8,
  marginTop: 10
};

const container = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "40px 20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: 30
};

const glassCard = {
  padding: 40,
  borderRadius: 24,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  transition: "0.3s",
  cursor: "pointer"
};

const cardTitle = { fontSize: 20, marginBottom: 10 };

const cardText = { opacity: 0.7 };

const section = { marginTop: 80 };

const sectionTitle = {
  fontSize: 28,
  textAlign: "center",
  marginBottom: 30
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: 20
};

const featureCard = {
  padding: 25,
  borderRadius: 20,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "0.3s",
  cursor: "pointer"
};

const iconWrap = {
  marginBottom: 12
};

const statsSection = {
  display: "flex",
  gap: 20,
  marginTop: 80,
  flexWrap: "wrap"
};

const statBox = {
  flex: 1,
  padding: 30,
  borderRadius: 20,
  background: "rgba(255,255,255,0.05)",
  textAlign: "center"
};

const ctaSection = {
  marginTop: 80,
  padding: 50,
  textAlign: "center",
  borderRadius: 20,
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)"
};

const ctaBtn = {
  padding: "12px 26px",
  borderRadius: 10,
  border: "none",
  background: "#fff",
  color: "#2563eb",
  fontWeight: 700,
  cursor: "pointer"
};