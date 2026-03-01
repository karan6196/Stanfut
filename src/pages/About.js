export default function About() {
  return (
    <div style={page}>
      
      {/* HERO */}
      <section style={hero}>
        <h1 style={heroTitle}>About STANFUT</h1>
        <p style={heroSubtitle}>
          Redefining mobility with speed, safety and seamless technology.
        </p>
      </section>

      <div style={container}>

        {/* Mission & Vision */}
        <div style={grid}>
          <div style={glassCard}>
            <h3 style={cardTitle}>Our Mission</h3>
            <p style={cardText}>
              To provide reliable and affordable vehicle rentals powered by a
              modern, technology‑first platform that makes booking effortless.
            </p>
          </div>

          <div style={glassCard}>
            <h3 style={cardTitle}>Our Vision</h3>
            <p style={cardText}>
              To become India’s most trusted and innovative vehicle rental ecosystem.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={section}>
          <h2 style={sectionTitle}>Why Choose STANFUT?</h2>

          <div style={featureGrid}>

            <FeatureCard
              title="Seamless Booking"
              description="Book your vehicle in minutes with our smooth checkout system."
            >
              <path d="M3 12h18" />
              <path d="M12 3v18" />
            </FeatureCard>

            <FeatureCard
              title="Transparent Pricing"
              description="No hidden charges. What you see is what you pay."
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </FeatureCard>

            <FeatureCard
              title="Secure Payments"
              description="Industry‑standard security to keep your transactions safe."
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </FeatureCard>

            <FeatureCard
              title="Trusted Partners"
              description="Carefully verified vehicles and reliable rental partners."
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12l2 2 4-4" />
            </FeatureCard>

          </div>
        </div>

        {/* Stats */}
        <div style={statsSection}>
          <div style={statBox}>
            <h2>1000+</h2>
            <p>Bookings Completed</p>
          </div>
          <div style={statBox}>
            <h2>500+</h2>
            <p>Vehicles Available</p>
          </div>
          <div style={statBox}>
            <h2>99%</h2>
            <p>Customer Satisfaction</p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= FEATURE CARD COMPONENT ================= */

function FeatureCard({ title, description, children }) {
  return (
    <div
      style={featureCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={iconWrap}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          {children}
        </svg>
      </div>

      <h4 style={{ marginBottom: 10 }}>{title}</h4>
      <p style={{ opacity: 0.75 }}>{description}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f172a,#020617)",
  color: "#fff",
};

const hero = {
  padding: "100px 20px 60px",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "48px",
  fontWeight: 900,
  marginBottom: "20px",
};

const heroSubtitle = {
  fontSize: "18px",
  opacity: 0.75,
  maxWidth: "600px",
  margin: "0 auto",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px 80px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "30px",
  marginBottom: "80px",
};

const glassCard = {
  padding: "40px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
};

const cardTitle = {
  marginBottom: "15px",
  fontSize: "20px",
};

const cardText = {
  opacity: 0.8,
  lineHeight: 1.7,
};

const section = {
  marginBottom: "80px",
};

const sectionTitle = {
  fontSize: "32px",
  marginBottom: "40px",
  textAlign: "center",
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "25px",
};

const featureCard = {
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

const iconWrap = {
  width: "60px",
  height: "60px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "18px",
};

const statsSection = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px",
  textAlign: "center",
};

const statBox = {
  flex: 1,
  minWidth: "200px",
  padding: "30px",
  borderRadius: "20px",
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
};