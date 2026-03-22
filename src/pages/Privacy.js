export default function Privacy() {
  return (
    <div style={page}>

      {/* HERO */}
      <div style={hero}>
        <h1 style={heroTitle}>Privacy Policy</h1>
        <p style={heroSub}>
          Your data, your control. We are committed to protecting your privacy.
        </p>
      </div>

      <div style={container}>

        {/* INTRO */}
        <div style={card}>
          <p style={text}>
            At <b>STANFUT</b>, we value your trust. This Privacy Policy explains how we collect,
            use, and safeguard your information when you use our platform.
          </p>
        </div>

        {/* SECTION */}
        <div style={card}>
          <h3 style={sectionTitle}>📊 Information We Collect</h3>
          <ul style={list}>
            <li>Name, email, phone number</li>
            <li>Booking and transaction details</li>
            <li>Device and usage data</li>
          </ul>
        </div>

        {/* SECTION */}
        <div style={card}>
          <h3 style={sectionTitle}>⚙️ How We Use Your Data</h3>
          <ul style={list}>
            <li>To process bookings and payments</li>
            <li>To improve platform experience</li>
            <li>To provide customer support</li>
            <li>To send important updates</li>
          </ul>
        </div>

        {/* SECTION */}
        <div style={card}>
          <h3 style={sectionTitle}>🔐 Data Protection</h3>
          <p style={text}>
            We use industry‑standard security measures, encryption, and secure servers
            to protect your personal data.
          </p>
        </div>

        {/* SECTION */}
        <div style={card}>
          <h3 style={sectionTitle}>🤝 Third-Party Sharing</h3>
          <p style={text}>
            We do not sell your data. Information may be shared only with trusted partners
            for booking fulfillment and payment processing.
          </p>
        </div>

        {/* SECTION */}
        <div style={card}>
          <h3 style={sectionTitle}>🛠 Your Rights</h3>
          <ul style={list}>
            <li>Access your data</li>
            <li>Request corrections</li>
            <li>Request deletion</li>
          </ul>
        </div>

        {/* CTA */}
        <div style={cta}>
          <h3>Have questions about your data?</h3>
          <p style={{ opacity: 0.7 }}>
            Reach out to our support team anytime.
          </p>
          <button style={btn}>Contact Support</button>
        </div>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a)",
  color: "#fff",
};

const hero = {
  textAlign: "center",
  padding: "100px 20px 60px",
};

const heroTitle = {
  fontSize: "48px",
  fontWeight: 900,
  marginBottom: "12px",
};

const heroSub = {
  opacity: 0.7,
  maxWidth: "600px",
  margin: "0 auto",
};

const container = {
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const card = {
  padding: "24px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
};

const sectionTitle = {
  marginBottom: "10px",
  fontSize: "18px",
};

const text = {
  opacity: 0.8,
  lineHeight: 1.7,
};

const list = {
  paddingLeft: "18px",
  opacity: 0.8,
  lineHeight: 1.7,
};

const cta = {
  marginTop: "30px",
  padding: "30px",
  borderRadius: "16px",
  textAlign: "center",
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
};

const btn = {
  marginTop: "12px",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#fff",
  color: "#2563eb",
  fontWeight: 600,
  cursor: "pointer",
};