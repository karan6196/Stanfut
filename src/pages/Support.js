import { useState } from "react";
import toast from "react-hot-toast";

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success("Support request sent!");
      setForm({ name: "", email: "", message: "" });
    }, 600);
  }

  return (
    <div style={wrap}>
      <h1>Contact Support</h1>

      <div style={info}>
        <p><b>Address:</b> XYZ Street, Ludhiana, Punjab, India</p>
        <p><b>Phone:</b> +91 9877993425</p>
        <p><b>Email:</b> support@stanfut.com</p>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          style={input}
        />
        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          style={input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          style={textarea}
        />
        <button style={btn}>Send Message</button>
      </form>
    </div>
  );
}

const wrap = { padding: "24px" };
const info = { marginBottom: "20px", lineHeight: "1.8" };
const formStyle = { display: "flex", flexDirection: "column", gap: "12px" };
const input = { padding: "10px", borderRadius: "8px", border: "1px solid #ddd" };
const textarea = { ...input, minHeight: "120px" };
const btn = {
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};