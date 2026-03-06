export default function Contact() {
  return (
    <div style={{ padding: "60px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "20px" }}>
        Contact Us
      </h1>

      <p style={{ marginBottom: "30px", color: "#555" }}>
        We'd love to hear from you. Fill out the form below and our team will
        get back to you shortly.
      </p>

      <form style={form}>
        <input type="text" placeholder="Your Name" style={input} />
        <input type="email" placeholder="Your Email" style={input} />
        <textarea placeholder="Your Message" rows="5" style={input}></textarea>

        <button type="submit" style={button}>
          Send Message
        </button>
      </form>
    </div>
  );
}

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const input = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const button = {
  padding: "14px",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg,#2563eb,#1e40af)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};