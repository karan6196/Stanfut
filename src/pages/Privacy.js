export default function Privacy() {
  return (
    <div style={wrap}>
      <h1 style={title}>Privacy Policy</h1>
      <p style={text}>
        Your privacy is important to us. This policy explains how STANFUT
        collects, uses, and protects your information.
      </p>

      <h3 style={sub}>Information We Collect</h3>
      <p style={text}>
        We may collect personal information such as name, email, phone number,
        and booking details to provide better service.
      </p>

      <h3 style={sub}>How We Use Your Data</h3>
      <p style={text}>
        Your data is used to process bookings, improve user experience, and
        provide customer support.
      </p>

      <h3 style={sub}>Data Protection</h3>
      <p style={text}>
        We implement industry‑standard security measures to protect your data.
      </p>
    </div>
  );
}

const wrap = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "24px",
background: "#0c0d0d",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  lineHeight: 1.6,
};

const title = {
  fontSize: "28px",
  marginBottom: "16px",
};

const sub = {
  marginTop: "20px",
};

const text = {
  opacity: 0.8,
};
