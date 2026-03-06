import { useState } from "react";
import { useAuthUI } from "../context/AuthUIContext";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiX, FiZap, FiShield, FiMapPin } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";

export default function AuthModal() {

  const { open, mode, closeAuth, openLogin, openSignup } = useAuthUI();
  const { login, signup } = useAuth();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async () => {
    try{
      setLoading(true);

      if(mode === "login"){
        await login(email,password);
      }

      if(mode === "signup"){
        if(password !== confirmPassword){
          alert("Passwords do not match");
          setLoading(false);
          return;
        }
        await signup(email,password);
      }

      closeAuth();

    }catch(err){
      alert(err.message);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div style={overlay} onClick={closeAuth}>
      <div style={modal} onClick={(e)=>e.stopPropagation()}>

        <button style={closeBtn} onClick={closeAuth}>
          <FiX />
        </button>

        {/* LEFT PANEL */}
        <div style={leftPanel}>
          <div style={brandLogo}>S</div>

          <h2 style={brandTitle}>Welcome to STANFUT</h2>

          <p style={brandText}>
            Premium vehicle rentals built for speed,
            safety and seamless booking.
          </p>

          <div style={brandFeatures}>
            <Feature icon={<FiZap />} text="Instant Booking" />
            <Feature icon={<FaCarSide />} text="Verified Vehicles" />
            <Feature icon={<FiShield />} text="Fully Insured" />
            <Feature icon={<FiMapPin />} text="Available Near You" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={rightPanel}>

          <h2 style={formTitle}>
            {mode === "login" ? "Login" : "Create Account"}
          </h2>

          <div style={inputWrapper}>
            <FiMail style={inputIcon}/>
            <input
              placeholder="Email address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={input}
            />
          </div>

          <div style={inputWrapper}>
            <FiLock style={inputIcon}/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={input}
            />
          </div>

          {mode === "signup" && (
            <div style={inputWrapper}>
              <FiLock style={inputIcon}/>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                style={input}
              />
            </div>
          )}

          <button 
            style={{
              ...submitBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }} 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>

          <div style={switchRow}>
            {mode === "login" ? (
              <>
                Don't have an account?
                <span onClick={openSignup} style={switchBtn}>
                  Create account
                </span>
              </>
            ) : (
              <>
                Already have an account?
                <span onClick={openLogin} style={switchBtn}>
                  Login
                </span>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div style={featureRow}>
      <div style={featureIcon}>{icon}</div>
      <span>{text}</span>
    </div>
  );
}

/* ---------- STYLES ---------- */

const overlay = {
  position: "fixed",
  inset:0,
  background:"rgba(0,0,0,0.75)",
  backdropFilter:"blur(10px)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  zIndex:10000,
  animation:"fadeIn 0.25s ease"
};

const modal = {
  width:"960px",
  maxWidth:"95%",
  height:"560px",
  background:"#fff",
  borderRadius:"22px",
  overflow:"hidden",
  display:"grid",
  gridTemplateColumns:"1fr 1fr",
  boxShadow:"0 60px 120px rgba(0,0,0,0.55)",
  position:"relative",
  transform:"scale(1)",
  transition:"all 0.3s ease"
};

const closeBtn = {
  position:"absolute",
  top:18,
  right:20,
  border:"none",
  background:"transparent",
  fontSize:"22px",
  cursor:"pointer",
  color:"#94a3b8",
  transition:"0.2s"
};

const leftPanel = {
  background:"linear-gradient(135deg,#1e3a8a,#2563eb,#0ea5e9)",
  color:"#fff",
  padding:"70px",
  display:"flex",
  flexDirection:"column",
  justifyContent:"center"
};

const brandLogo = {
  width:"64px",
  height:"64px",
  borderRadius:"18px",
  background:"#fff",
  color:"#1e3a8a",
  fontWeight:"900",
  fontSize:"24px",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  marginBottom:"26px",
  boxShadow:"0 10px 30px rgba(0,0,0,0.25)"
};

const brandTitle = {
  fontSize:"32px",
  fontWeight:"900",
  marginBottom:"16px"
};

const brandText = {
  opacity:0.9,
  marginBottom:"32px",
  lineHeight:1.7
};

const brandFeatures = {
  display:"flex",
  flexDirection:"column",
  gap:"16px",
  fontWeight:"600",
  fontSize:"15px"
};

const featureRow = {
  display:"flex",
  alignItems:"center",
  gap:"12px"
};

const featureIcon = {
  fontSize:"20px"
};

const rightPanel = {
  padding:"70px",
  display:"flex",
  flexDirection:"column",
  justifyContent:"center"
};

const formTitle = {
  fontSize:"30px",
  fontWeight:"900",
  marginBottom:"28px",
  color:"#0f172a"
};

const inputWrapper = {
  position:"relative",
  marginBottom:"18px"
};

const inputIcon = {
  position:"absolute",
  top:"50%",
  left:"14px",
  transform:"translateY(-50%)",
  color:"#94a3b8"
};

const input = {
  width:"100%",
  padding:"15px 15px 15px 45px",
  borderRadius:"14px",
  border:"1px solid #e2e8f0",
  fontSize:"14px",
  outline:"none",
  transition:"0.2s",
  boxShadow:"0 2px 6px rgba(0,0,0,0.04)"
};

const submitBtn = {
  marginTop:"12px",
  padding:"15px",
  borderRadius:"14px",
  border:"none",
  background:"linear-gradient(135deg,#2563eb,#0ea5e9)",
  color:"#fff",
  fontWeight:"800",
  fontSize:"15px",
  transition:"0.2s",
  boxShadow:"0 10px 25px rgba(37,99,235,0.4)"
};

const switchRow = {
  marginTop:"22px",
  fontSize:"14px",
  color:"#64748b"
};

const switchBtn = {
  marginLeft:"6px",
  color:"#2563eb",
  cursor:"pointer",
  fontWeight:"700"
};