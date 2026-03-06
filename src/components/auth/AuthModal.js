import { useState } from "react";
import { useAuthUI } from "../context/AuthUIContext";
import { useAuth } from "../context/AuthContext";
import { FiX, FiMail, FiLock, FiZap, FiShield, FiMapPin } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";

export default function AuthModal() {

const { open, mode, closeAuth, openLogin, openSignup } = useAuthUI();
const { login, signup } = useAuth();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const handleSubmit = async () => {

try{

if(mode === "login"){
await login(email,password);
}

if(mode === "signup"){

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

await signup(email,password);
}

closeAuth();

}catch(err){
alert(err.message);
}

};

if (!open) return null;

return (
<div style={overlay}>

<div style={modal}>

{/* CLOSE BUTTON */}
<button style={closeBtn} onClick={closeAuth}>
<FiX />
</button>

{/* LEFT SIDE */}
<div style={leftPanel}>
<div style={brandLogo}>S</div>

<h2 style={brandTitle}>Welcome to STANFUT</h2>

<p style={brandText}>
Premium vehicle rentals built for speed,
safety and seamless booking.
</p>

<div style={brandFeatures}>
<div style={featureRow}><FiZap /> Instant Booking</div>
<div style={featureRow}><FaCarSide /> Verified Vehicles</div>
<div style={featureRow}><FiShield /> Fully Insured</div>
<div style={featureRow}><FiMapPin /> Available Near You</div>
</div>

</div>

{/* RIGHT SIDE */}
<div style={rightPanel}>

<h2 style={formTitle}>
{mode === "login" ? "Login to Continue" : "Create Your Account"}
</h2>

<input
placeholder="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={input}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={input}
/>

{mode === "signup" && (
<input
type="password"
placeholder="Confirm password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
style={input}
/>
)}

<button style={submitBtn} onClick={handleSubmit}>
{mode === "login" ? "Login" : "Create Account"}
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

/* ---------- STYLES ---------- */

const overlay = {
position: "fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.75)",
backdropFilter:"blur(8px)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:10000
};

const modal = {
width:"920px",
maxWidth:"95%",
height:"540px",
background:"#fff",
borderRadius:"22px",
overflow:"hidden",
display:"grid",
gridTemplateColumns:"1fr 1fr",
boxShadow:"0 50px 100px rgba(0,0,0,0.5)",
position:"relative"
};

const closeBtn = {
position:"absolute",
top:16,
right:18,
border:"none",
background:"#f1f5f9",
width:"36px",
height:"36px",
borderRadius:"50%",
cursor:"pointer",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"18px"
};

const leftPanel = {
background:"linear-gradient(135deg,#1e3a8a,#2563eb,#0ea5e9)",
color:"#fff",
padding:"60px",
display:"flex",
flexDirection:"column",
justifyContent:"center"
};

const brandLogo = {
width:"60px",
height:"60px",
borderRadius:"16px",
background:"#fff",
color:"#1e3a8a",
fontWeight:"900",
fontSize:"22px",
display:"flex",
alignItems:"center",
justifyContent:"center",
marginBottom:"24px"
};

const brandTitle = {
fontSize:"30px",
fontWeight:"900",
marginBottom:"14px"
};

const brandText = {
opacity:0.9,
marginBottom:"30px",
lineHeight:1.6
};

const brandFeatures = {
display:"flex",
flexDirection:"column",
gap:"14px",
fontWeight:"600",
fontSize:"15px"
};

const featureRow = {
display:"flex",
alignItems:"center",
gap:"10px"
};

const rightPanel = {
padding:"60px",
display:"flex",
flexDirection:"column",
justifyContent:"center"
};

const formTitle = {
fontSize:"28px",
fontWeight:"900",
marginBottom:"24px",
color:"#0f172a"
};

const input = {
padding:"14px",
borderRadius:"12px",
border:"1px solid #e2e8f0",
marginBottom:"16px",
fontSize:"14px",
width:"100%"
};

const submitBtn = {
marginTop:"10px",
padding:"14px",
borderRadius:"14px",
border:"none",
background:"linear-gradient(135deg,#2563eb,#0ea5e9)",
color:"#fff",
fontWeight:"800",
cursor:"pointer",
fontSize:"15px"
};

const switchRow = {
marginTop:"20px",
fontSize:"14px",
color:"#64748b"
};

const switchBtn = {
marginLeft:"6px",
color:"#2563eb",
cursor:"pointer",
fontWeight:"700"
};