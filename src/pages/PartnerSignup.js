import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";


import { FiUser, FiPhone, FiMapPin, FiMail, FiLock } from "react-icons/fi";

export default function PartnerSignup(){

const navigate = useNavigate();

const [businessName,setBusinessName] = useState("");
const [phone,setPhone] = useState("");
const [city,setCity] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const registerPartner = async()=>{

try{

const userCred = await createUserWithEmailAndPassword(
auth,
email,
password
);

const uid = userCred.user.uid;

await setDoc(doc(db,"partners",uid),{
email,
businessName,
phone,
city,
createdAt: serverTimestamp()
});

alert("Partner account created");

navigate("/partner");

}catch(err){

alert(err.message);

}

};

return(

<div style={page}>

<div style={card}>

<h1 style={title}>Become a Partner</h1>

<p style={subtitle}>
Earn money by renting your vehicles on Stanfut
</p>

<div style={benefits}>

<div style={benefitItem}>
💰 Earn passive income from your vehicles
</div>

<div style={benefitItem}>
📅 Get verified bookings from real customers
</div>

<div style={benefitItem}>
🚀 Grow your fleet with Stanfut
</div>

<div style={benefitItem}>
🔒 Secure payments & partner dashboard
</div>

</div>

{/* Business Name */}

<div style={inputGroup}>
<FiUser style={icon}/>
<input
placeholder="Business Name"
value={businessName}
onChange={(e)=>setBusinessName(e.target.value)}
style={input}
/>
</div>

{/* Phone */}

<div style={inputGroup}>
<FiPhone style={icon}/>
<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
style={input}
/>
</div>

{/* City */}

<div style={inputGroup}>
<FiMapPin style={icon}/>
<input
placeholder="City"
value={city}
onChange={(e)=>setCity(e.target.value)}
style={input}
/>
</div>

{/* Email */}

<div style={inputGroup}>
<FiMail style={icon}/>
<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={input}
/>
</div>

{/* Password */}

<div style={inputGroup}>
<FiLock style={icon}/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={input}
/>
</div>

<button style={button} onClick={registerPartner}>

<IoCarSportSharp style={{marginRight:8,fontSize:18}}/>

Create Partner Account

</button>

</div>

</div>

);

}

/* ---------- STYLES ---------- */

const page={
minHeight:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:"#020617",
padding:"40px 20px"
};

const card={
width:"420px",
padding:"40px",
borderRadius:"20px",
background:"rgba(15,23,42,0.8)",
backdropFilter:"blur(14px)",
border:"1px solid rgba(255,255,255,0.08)",
boxShadow:"0 25px 60px rgba(0,0,0,0.5)",
display:"flex",
flexDirection:"column",
gap:"14px"
};

const title={
fontSize:28,
fontWeight:800,
textAlign:"center",
color:"#fff"
};

const subtitle={
fontSize:14,
textAlign:"center",
color:"#94a3b8",
marginBottom:"10px"
};

const inputGroup={
display:"flex",
alignItems:"center",
gap:"10px",
background:"rgba(255,255,255,0.05)",
border:"1px solid rgba(255,255,255,0.08)",
borderRadius:"12px",
padding:"10px"
};

const icon={
color:"#38bdf8",
fontSize:18
};

const input={
flex:1,
background:"transparent",
border:"none",
outline:"none",
color:"#fff",
fontSize:14
};

const button={
marginTop:"10px",
padding:"14px",
borderRadius:"12px",
border:"none",
fontWeight:"700",
fontSize:"15px",
background:"linear-gradient(135deg,#3b82f6,#2563eb)",
color:"#fff",
cursor:"pointer"
};

const benefits={
display:"flex",
flexDirection:"column",
gap:"10px",
background:"rgba(255,255,255,0.04)",
border:"1px solid rgba(255,255,255,0.08)",
borderRadius:"12px",
padding:"16px",
marginBottom:"10px"
}

const benefitItem={
fontSize:"14px",
color:"#cbd5f5"
}