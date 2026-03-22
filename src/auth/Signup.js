import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

await setDoc(doc(db, "users", res.user.uid), {
  email: res.user.email,
  role: "user", // default role
  createdAt: new Date()
});

navigate("/profile");
    } catch (err) {
      setError("Failed to create account");
    }

    setLoading(false);
  };

  return (
    <div style={page}>
      <form style={card} onSubmit={handleSignup}>
        <div style={logo}>S</div>
        <h2 style={{ margin: 0 }}>Create Account</h2>
        <p className="small">Join STANFUT in 30 seconds ✅</p>

        {error && <div style={errorBox}>{error}</div>}

        <input
          style={input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={input}
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          style={input}
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button style={btn} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div style={divider}>OR</div>

        <p className="small">
          Already have an account?{" "}
          <Link to="/login" style={link}>
            Login →
          </Link>
        </p>
      </form>
    </div>
  );
}

/* Styles same as Login */

const page = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg,#06b6d4 0%,#2563eb 100%)",
};

const card = {
  width: "100%",
  maxWidth: "380px",
  background: "#fff",
  padding: "28px",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  textAlign: "center",
};

const logo = {
  width: "50px",
  height: "50px",
  borderRadius: "14px",
  background: "linear-gradient(135deg,#2563eb,#06b6d4)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
  margin: "0 auto 10px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  outline: "none",
};

const btn = {
  width: "100%",
  marginTop: "16px",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  fontWeight: "700",
  color: "#fff",
  background:
    "linear-gradient(135deg,#2563eb,#06b6d4)",
  cursor: "pointer",
};

const divider = {
  margin: "16px 0",
  opacity: 0.6,
};

const link = {
  color: "#2563eb",
  fontWeight: "600",
};

const errorBox = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "10px",
  borderRadius: "10px",
  marginTop: "10px",
};
