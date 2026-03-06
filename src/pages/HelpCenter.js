import { useState } from "react";

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

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

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={wrap}>
      <h1>Help Center</h1>

      <input
        style={searchBox}
        placeholder="Search help..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.map((faq, i) => (
        <div key={i} style={card}>
          <div
            style={question}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {faq.q}
          </div>
          {open === i && <div style={answer}>{faq.a}</div>}
        </div>
      ))}
    </div>
  );
}

const wrap = { padding: "24px" };
const searchBox = {
  width: "100%",
  padding: "10px",
  margin: "16px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
};
const card = {
  padding: "14px",
  border: "1px solid #eee",
  borderRadius: "10px",
  marginBottom: "10px",
};
const question = { fontWeight: "bold", cursor: "pointer" };
const answer = { marginTop: "8px", opacity: 0.8 };