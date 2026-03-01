import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/vehicles");
    } catch (err) {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div style={page}>
      <form style={card} onSubmit={handleLogin}>
        <div style={logo}>S</div>
        <h2 style={{ margin: 0 }}>Welcome Back</h2>
        <p className="small">Login to continue booking 🚀</p>

        {error && <div style={errorBox}>{error}</div>}

        <input
          style={input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div style={{ position: "relative" }}>
          <input
            style={input}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            style={eye}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <button style={btn} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={divider}>OR</div>

        <p className="small">
          Don’t have an account?{" "}
          <Link to="/signup" style={link}>
            Create one →
          </Link>
        </p>
      </form>
    </div>
  );
}

/* Styles */

const page = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)",
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

const eye = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const errorBox = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "10px",
  borderRadius: "10px",
  marginTop: "10px",
};
