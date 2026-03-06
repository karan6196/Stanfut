import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

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

        <h2 style={title}>Welcome Back guys</h2>
        <p style={subtitle}>Login to continue booking</p>

        {error && <div style={errorBox}>{error}</div>}

        {/* Email Field */}
        <div style={inputWrapper}>
          <FiMail style={inputIcon} />
          <input
            style={input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div style={inputWrapper}>
          <FiLock style={inputIcon} />
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
            {showPass ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button style={btn} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={divider}>OR</div>

        <p style={signupText}>
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
  background: "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)",
};

const card = {
  width: "100%",
  maxWidth: "400px",
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
  padding: "32px",
  borderRadius: "20px",
  boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
  textAlign: "center",
};

const logo = {
  width: "55px",
  height: "55px",
  borderRadius: "16px",
  background: "linear-gradient(135deg,#2563eb,#06b6d4)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
  fontSize: "20px",
  margin: "0 auto 18px",
};

const title = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "700",
  color: "#0f172a",
};

const subtitle = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "20px",
};

const inputWrapper = {
  position: "relative",
  marginTop: "14px",
};

const inputIcon = {
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-50%)",
  color: "#94a3b8",
};

const input = {
  width: "100%",
  padding: "12px 40px 12px 40px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: "14px",
};

const eye = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#64748b",
};

const btn = {
  width: "100%",
  marginTop: "18px",
  padding: "12px",
  borderRadius: "14px",
  border: "none",
  fontWeight: "700",
  fontSize: "15px",
  color: "#fff",
  background: "linear-gradient(135deg,#2563eb,#06b6d4)",
  cursor: "pointer",
  transition: "0.3s",
};

const divider = {
  margin: "18px 0",
  opacity: 0.5,
  fontSize: "13px",
};

const signupText = {
  fontSize: "14px",
  color: "#475569",
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
  marginTop: "12px",
  fontSize: "14px",
};