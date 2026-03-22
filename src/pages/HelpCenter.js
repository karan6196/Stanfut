import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const faqs = [
    {
      q: "How do I book a vehicle?",
      a: "Browse vehicles → select → click Book → complete checkout.",
      category: "Booking",
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, cancellations are allowed before pickup time.",
      category: "Booking",
    },
    {
      q: "What payment methods are supported?",
      a: "UPI, Cards, Net Banking, and Wallets.",
      category: "Payments",
    },
    {
      q: "How do I update my profile?",
      a: "Go to Profile → Edit → Save changes.",
      category: "Account",
    },
  ];

  const categories = ["All", "Booking", "Payments", "Account"];

  const filtered = faqs.filter((f) => {
    return (
      (activeCategory === "All" || f.category === activeCategory) &&
      f.q.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={page}>

      {/* HERO */}
      <div style={hero}>
        <h1 style={title}>Help Center</h1>
        <p style={subtitle}>How can we help you today?</p>

        <input
          style={searchBox}
          placeholder="Search for help..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={container}>

        {/* CATEGORY FILTER */}
        <div style={tabs}>
          {categories.map((c) => (
            <button
              key={c}
              style={activeCategory === c ? activeTab : tab}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FAQ LIST */}
        <div style={faqWrapper}>
          {filtered.length === 0 ? (
            <div style={empty}>No results found</div>
          ) : (
            filtered.map((faq, i) => (
              <div
                key={i}
                style={card}
                onMouseEnter={hoverIn}
                onMouseLeave={hoverOut}
              >
                <div
                  style={question}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {faq.q}
                  <span>{open === i ? "−" : "+"}</span>
                </div>

                {open === i && (
                  <div style={answer}>{faq.a}</div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CONTACT CTA */}
        <div style={cta}>
          <h3>Still need help?</h3>
          <p style={{ opacity: 0.7 }}>
            Contact our support team anytime.
          </p>
<button
  style={ctaBtn}
  onClick={() => navigate("/contact")}
>
  Contact Support
</button>
        </div>

      </div>
    </div>
  );
}

/* ---------- HOVER ---------- */

const hoverIn = (e) => {
  e.currentTarget.style.transform = "translateY(-6px)";
  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.5)";
};

const hoverOut = (e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "none";
};

/* ---------- STYLES ---------- */

const page = {
  background: "linear-gradient(135deg,#020617,#0f172a)",
  minHeight: "100vh",
  color: "#fff",
};

const hero = {
  textAlign: "center",
  padding: "100px 20px 60px",
};

const title = {
  fontSize: "48px",
  fontWeight: 900,
  marginBottom: 10,
};

const subtitle = {
  opacity: 0.7,
  marginBottom: 20,
};

const searchBox = {
  padding: "14px 18px",
  width: "100%",
  maxWidth: "500px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
};

const container = {
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
};

const tabs = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  marginBottom: "30px",
  flexWrap: "wrap",
};

const tab = {
  padding: "8px 16px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "transparent",
  color: "#fff",
  cursor: "pointer",
};

const activeTab = {
  ...tab,
  background: "linear-gradient(135deg,#3b82f6,#2563eb)",
  border: "none",
};

const faqWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const card = {
  padding: "18px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "0.3s",
};

const question = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: 600,
  cursor: "pointer",
};

const answer = {
  marginTop: "10px",
  opacity: 0.75,
  lineHeight: 1.6,
};

const empty = {
  textAlign: "center",
  opacity: 0.6,
  padding: "40px",
};

const cta = {
  marginTop: "50px",
  textAlign: "center",
  padding: "30px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
};

const ctaBtn = {
  marginTop: "12px",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
};