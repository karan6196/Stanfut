export default function Careers() {
  return (
    <div style={page}>

      {/* HERO */}
      <section style={hero}>
        <div style={heroGlow}></div>

        <h1 style={title}>Careers at STANFUT</h1>

        <p style={subtitle}>
          We’re building the future of vehicle rentals.
          Join us on this journey 🚀
        </p>
      </section>

      <div style={container}>

        {/* WHY JOIN */}
        <div style={section}>
          <h2 style={heading}>Why Join Us?</h2>

          <div style={grid}>

            <Card
              title="🚀 Fast Growing Startup"
              desc="Be part of a rapidly growing mobility platform"
            />

            <Card
              title="💡 Ownership & Impact"
              desc="Work directly on real problems and see your impact"
            />

            <Card
              title="⚡ Modern Tech Stack"
              desc="Build with latest tools and scalable systems"
            />

            <Card
              title="🌍 Flexible Culture"
              desc="Work with freedom and creativity"
            />

          </div>
        </div>

        {/* EMPTY JOB STATE */}
        <div style={emptyBox}>
          <h3 style={{ fontSize: "22px", marginBottom: 10 }}>
            No Open Positions Right Now
          </h3>

          <p style={{ opacity: 0.7, marginBottom: 20 }}>
            We’re not hiring at the moment, but we’re always looking for
            talented people.
          </p>

          <button style={ctaBtn}>
            Send Your Resume
          </button>
        </div>

        {/* FUTURE CTA */}
        <div style={ctaSection}>
          <h2 style={{ marginBottom: 10 }}>
            Want to be part of something big?
          </h2>

          <p style={{ opacity: 0.7 }}>
            Drop your details and we’ll reach out when we’re hiring.
          </p>
        </div>

      </div>
    </div>
  );
}

/* ---------- COMPONENT ---------- */

function Card({ title, desc }) {
  return (
    <div
      style={card}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      <h4 style={{ marginBottom: 10 }}>{title}</h4>
      <p style={{ opacity: 0.7 }}>{desc}</p>
    </div>
  );
}

/* ---------- HOVER ---------- */

const hoverIn = (e) => {
  e.currentTarget.style.transform = "translateY(-8px)";
  e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
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

const title = {
  fontSize: "50px",
  fontWeight: 900,
  background: "linear-gradient(135deg,#3b82f6,#22c55e)",
  WebkitBackgroundClip: "text",
  color: "transparent"
};

const subtitle = {
  marginTop: 10,
  opacity: 0.8
};

const container = {
  maxWidth: "1100px",
  margin: "auto",
  padding: "40px 20px"
};

const section = {
  marginBottom: 80
};

const heading = {
  textAlign: "center",
  fontSize: 28,
  marginBottom: 30
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: 20
};

const card = {
  padding: 25,
  borderRadius: 20,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "0.3s",
  cursor: "pointer"
};

const emptyBox = {
  textAlign: "center",
  padding: "60px 20px",
  borderRadius: 20,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: 60
};

const ctaBtn = {
  padding: "12px 26px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};

const ctaSection = {
  textAlign: "center",
  padding: "40px",
  borderRadius: 20,
  background: "rgba(255,255,255,0.05)"
};