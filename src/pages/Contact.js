import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone, FiMail } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";

export default function Contacts() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={pageWrap}>
      <div className="container">
        <div style={contactGrid}>
          
          {/* LEFT SIDE */}
          <div style={leftSection}>
            <h1 style={title}>
              <BsChatDots style={titleIcon} />
              Let’s Talk
            </h1>

            <p style={subtitle}>
              Have questions about bookings, pricing, or support?
              Our team is here to help you anytime.
            </p>

            <div style={infoBox}>
              <div style={infoItem}>
                <HiOutlineLocationMarker style={iconStyle} />
                <span>Phagwara, India</span>
              </div>

              <div style={infoItem}>
                <FiMail style={iconStyle} />
                <span>support@stanfut.com</span>
              </div>

              <div style={infoItem}>
                <FiPhone style={iconStyle} />
                <span>+91 98779 93425</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div style={formCard}>
            <form onSubmit={handleSubmit}>
              <div style={inputGroup}>
                <label style={label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  style={input}
                />
              </div>

              <div style={inputGroup}>
                <label style={label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  style={input}
                />
              </div>

              <div style={inputGroup}>
                <label style={label}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="4"
                  required
                  style={textarea}
                />
              </div>

              <button type="submit" style={submitBtn}>
                Send Message →
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ========================
   STYLES
======================== */

const pageWrap = {
  padding: "80px 20px",
};

const contactGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  alignItems: "center",
};

const leftSection = {
  maxWidth: "480px",
};

const title = {
  fontSize: "42px",
  fontWeight: "800",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
};

const titleIcon = {
  marginRight: "12px",
  fontSize: "34px",
  color: "#3b82f6",
};

const subtitle = {
  color: "#94a3b8",
  lineHeight: "1.6",
  marginBottom: "30px",
};

const infoBox = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const infoItem = {
  fontSize: "15px",
  color: "#e2e8f0",
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const iconStyle = {
  fontSize: "20px",
  color: "#3b82f6",
};

const formCard = {
  background: "rgba(30,41,59,0.85)",
  padding: "30px",
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
  backdropFilter: "blur(14px)",
};

const inputGroup = {
  marginBottom: "20px",
};

const label = {
  display: "block",
  fontSize: "14px",
  marginBottom: "8px",
  color: "#cbd5e1",
  fontWeight: "500",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "#0f172a",
  color: "#fff",
  outline: "none",
};

const textarea = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "#0f172a",
  color: "#fff",
  resize: "none",
  outline: "none",
};

const submitBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg,#3b82f6,#2563eb)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
  boxShadow: "0 10px 25px rgba(37,99,235,0.4)",
};