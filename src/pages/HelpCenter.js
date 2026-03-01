import { useState } from "react";

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "How do I book a vehicle?",
      a: "Browse vehicles → select your preferred vehicle → choose dates → click Book → complete checkout and confirm.",
      category: "Booking",
    },
    {
      q: "Can I cancel my booking?",
      a: "Yes, cancellations are allowed before the pickup time. Refund policy may apply depending on timing.",
      category: "Booking",
    },
    {
      q: "What payment methods are supported?",
      a: "We support UPI, Debit/Credit Cards, Net Banking, and Wallet payments.",
      category: "Payments",
    },
    {
      q: "Is a security deposit required?",
      a: "Yes, a refundable security deposit is required for all rentals.",
      category: "Payments",
    },
    {
      q: "How do I update my profile?",
      a: "Go to Profile → Click Edit → Update your details → Save changes.",
      category: "Account",
    },
    {
      q: "What documents are required at pickup?",
      a: "A valid driving license and government-issued ID are required.",
      category: "Verification",
    },
  ];

  const filtered = faqs.filter((faq) =>
    faq.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>Help Center</h1>
        <p style={subtitle}>
          Find answers to common questions and get support for your bookings.
        </p>

        <input
          style={searchBox}
          placeholder="Search help topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={faqWrapper}>
          {filtered.length === 0 && (
            <div style={noResult}>No results found.</div>
          )}

          {filtered.map((faq, index) => (
            <div key={index} style={card}>
              <div
                style={question}
                onClick={() => setOpen(open === index ? null : index)}
              >
                {faq.q}
              </div>

              {open === index && (
                <div style={answer}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={contactBox}>
          <h3 style={{ marginBottom: 10 }}>Still need help?</h3>
          <p style={{ opacity: 0.8 }}>
            Contact our support team and we’ll assist you as soon as possible.
          </p>
          <a href="/contact" style={supportBtn}>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  padding: "60px 20px",
};

const container = {
  maxWidth: "1100px",
  margin: "0 auto",
  background: "rgba(15,23,42,0.75)",
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  padding: "50px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  color: "#fff",
};

const title = {
  fontSize: "42px",
  fontWeight: "800",
  marginBottom: "10px",
};

const subtitle = {
  opacity: 0.7,
  marginBottom: "30px",
  fontSize: "16px",
};

const searchBox = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontSize: "16px",
  marginBottom: "40px",
  outline: "none",
};

const faqWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const card = {
  padding: "24px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const question = {
  fontSize: "18px",
  fontWeight: "700",
};

const answer = {
  marginTop: "14px",
  opacity: 0.85,
  lineHeight: 1.6,
};

const noResult = {
  opacity: 0.7,
  textAlign: "center",
  marginTop: "20px",
};

const contactBox = {
  marginTop: "60px",
  padding: "30px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  textAlign: "center",
};

const supportBtn = {
  display: "inline-block",
  marginTop: "20px",
  padding: "14px 28px",
  borderRadius: "14px",
  background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "700",
};