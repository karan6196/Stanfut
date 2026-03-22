import { useEffect, useState, useRef } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useBookings } from "../components/context/BookingContext";
import toast from "react-hot-toast";
import { db, storage } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
export default function Profile() {

const { user, logout } = useAuth();
const { bookings } = useBookings();

const fileRef = useRef();

const [name,setName] = useState("");
const [editing,setEditing] = useState(false);
const [avatar,setAvatar] = useState("");
const [memberSince,setMemberSince] = useState("");
const [activeTab,setActiveTab] = useState("overview");

useEffect(()=>{

if(!user) return;

const fetchProfile = async () => {

const snap = await getDoc(doc(db,"users",user.uid));

if(snap.exists()){

const data = snap.data();

setName(data.name || user.email.split("@")[0]);
setAvatar(data.avatar || "");

if(data.createdAt?.toDate){
setMemberSince(data.createdAt.toDate().getFullYear());
}

}else{

await setDoc(doc(db,"users",user.uid),{
name:user.email.split("@")[0],
email:user.email,
createdAt:serverTimestamp()
});

setName(user.email.split("@")[0]);

}

};

fetchProfile();

},[user]);

/* ---------- SAVE NAME ---------- */

const saveName = async () => {

try{

await setDoc(doc(db,"users",user.uid),{
name,
updatedAt:serverTimestamp()
},{merge:true});

setEditing(false);

toast.success("Profile updated");

}catch{

toast.error("Update failed");

}

};

/* ---------- UPLOAD AVATAR ---------- */

const uploadAvatar = async(file)=>{

if(!file || !user) return;

try{

const storageRef = ref(storage,`avatars/${user.uid}`);

await uploadBytes(storageRef,file);

const url = await getDownloadURL(storageRef);

setAvatar(url);

await setDoc(doc(db,"users",user.uid),{
avatar:url,
updatedAt:serverTimestamp()
},{merge:true});

toast.success("Avatar updated");

}catch{

toast.error("Upload failed");

}

};

/* ---------- STATS ---------- */

const totalBookings = bookings?.length || 0;

const completed = bookings?.filter(b=>b.status==="Paid").length || 0;

const active = bookings?.filter(b=>b.status==="Confirmed").length || 0;

const totalSpent = bookings?.reduce((sum,b)=>{

return sum + ((b.totalRent || 0)+(b.deposit || 0));

},0);

/* ---------- UI ---------- */

return (

<div style={page}>

{/* HEADER */}

<div style={header}>

<div style={avatarWrapper}>

<img
src={avatar || `https://ui-avatars.com/api/?name=${name}`}
style={avatarStyle}
/>

<div
style={editAvatar}
onClick={()=>fileRef.current.click()}
>
✎
</div>

<input
type="file"
hidden
ref={fileRef}
accept="image/*"
onChange={(e)=>uploadAvatar(e.target.files[0])}
/>

</div>

{/* NAME */}

{editing ? (

<div style={{display:"flex",gap:8,justifyContent:"center"}}>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
style={nameInput}
/>

<button style={saveBtn} onClick={saveName}>
Save
</button>

</div>

) : (

<h2 style={nameText} onClick={()=>setEditing(true)}>
{name}
</h2>

)}

<p style={emailText}>{user.email}</p>

{memberSince && (
<p style={memberText}>
Member since {memberSince}
</p>
)}

</div>

{/* TABS */}

<div style={tabs}>

{["overview","history","settings"].map(tab=>(

<div
key={tab}
style={{
...tabButton,
...(activeTab===tab?activeTabStyle:{})
}}
onClick={()=>setActiveTab(tab)}
>

{tab==="overview" && "Overview"}
{tab==="history" && "Bookings"}
{tab==="settings" && "Settings"}

</div>

))}

</div>

{/* OVERVIEW */}

{activeTab==="overview" && (

<div style={statsGrid}>

<StatCard label="Total Bookings" value={totalBookings}/>
<StatCard label="Active Rides" value={active}/>
<StatCard label="Completed" value={completed}/>
<StatCard label="Total Spent" value={`₹${totalSpent}`}/>

</div>

)}

{/* HISTORY */}

{activeTab==="history" && (

<div style={{display:"flex",flexDirection:"column",gap:16}}>

{bookings?.length===0 && (
<div style={empty}>
No bookings yet
</div>
)}

{bookings?.map((b,i)=>{

return(

<div key={i} style={rideCard}>

<div style={rideTop}>

<div style={{display:"flex",alignItems:"center",gap:10}}>

{b.vehicleName?.toLowerCase().includes("bike") ||
b.vehicleName?.toLowerCase().includes("scooter") ? (

<FaMotorcycle size={18} color="#38bdf8"/>

) : (

<FaCarSide size={18} color="#38bdf8"/>

)}

<div style={rideVehicle}>
{b.vehicleName}
</div>

</div>
<div
style={{
...statusBadge,
background:
b.status==="Paid"
? "#22c55e"
: b.status==="Confirmed"
? "#3b82f6"
: "#f59e0b"
}}
>

{b.status}

</div>

</div>

<Detail label="Booking ID" value={b.id}/>
<Detail label="Start" value={new Date(b.startTime).toLocaleString()}/>
<Detail label="End" value={new Date(b.endTime).toLocaleString()}/>
<Detail label="Price" value={`₹${b.totalRent || 0}`}/>

</div>

);

})}

</div>

)}

{/* SETTINGS */}

{activeTab==="settings" && (

<div style={card}>

<Row label="Email Verified" value={user.emailVerified?"Yes":"No"} />

<Row
label="Logout"
value="Sign out"
danger
onClick={logout}
/>

</div>

)}

</div>

);

}

/* ---------- COMPONENTS ---------- */

function StatCard({label,value}){

return(

<div style={statCard}>
<div style={statValue}>{value}</div>
<div style={statLabel}>{label}</div>
</div>

);

}

function Detail({label,value}){

return(

<div style={detailRow}>
<span style={detailLabel}>{label}</span>
<span style={detailValue}>{value}</span>
</div>

);

}

function Row({label,value,danger,onClick}){

return(

<div
style={{
...row,
color: danger ? "#ef4444" : "#e5e7eb"
}}
onClick={onClick}
>

<span>{label}</span>
<span>{value}</span>

</div>

);

}

/* ---------- STYLES ---------- */

const page = {
background:"#020617",
minHeight:"100vh",
padding:"40px 20px",
color:"#fff",
fontFamily:"system-ui"
};

const header = {
textAlign:"center",
marginBottom:40,
padding:"30px",
borderRadius:"20px",
background:"linear-gradient(135deg,#0f172a,#020617)",
border:"1px solid rgba(255,255,255,0.08)",
boxShadow:"0 20px 40px rgba(0,0,0,0.5)"
};

const avatarWrapper = {
position:"relative",
width:110,
height:110,
margin:"0 auto 14px"
};

const avatarStyle = {
width:"100%",
height:"100%",
borderRadius:"50%",
objectFit:"cover",
border:"4px solid #3b82f6",
boxShadow:"0 10px 30px rgba(59,130,246,0.5)"
};

const editAvatar = {
position:"absolute",
bottom:0,
right:0,
background:"#2563eb",
padding:"6px 9px",
borderRadius:"50%",
cursor:"pointer"
};

const nameText = {
fontSize:24,
fontWeight:700,
cursor:"pointer"
};

const nameInput = {
padding:8,
borderRadius:8,
border:"none"
};

const saveBtn = {
background:"#2563eb",
border:"none",
color:"#fff",
padding:"8px 12px",
borderRadius:8,
cursor:"pointer"
};

const emailText = {
opacity:0.6,
fontSize:13
};

const memberText = {
opacity:0.5,
fontSize:12
};

const tabs = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
  margin: "30px auto 40px",
  padding: "8px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 999,
  width: "fit-content",
  backdropFilter: "blur(10px)"
};

const tabButton = {
  padding: "10px 22px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  color: "#cbd5f5",
  transition: "all 0.25s ease"
};

const activeTabStyle = {
  background: "linear-gradient(135deg,#3b82f6,#2563eb)",
  color: "#fff",
  boxShadow: "0 8px 20px rgba(59,130,246,0.4)"
};

const statsGrid = {
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:20,
marginTop:20
};

const statCard = {
background:"linear-gradient(145deg,#111827,#020617)",
borderRadius:"18px",
padding:"24px",
textAlign:"center",
border:"1px solid rgba(255,255,255,0.05)",
boxShadow:"0 10px 30px rgba(0,0,0,0.4)",
transition:"all 0.2s ease"
};

const statValue = {
fontSize:20,
fontWeight:700
};

const statLabel = {
fontSize:12,
opacity:0.6
};

const rideCard = {
background:"rgba(15,23,42,0.7)",
borderRadius:"18px",
padding:"22px",
border:"1px solid rgba(255,255,255,0.06)",
backdropFilter:"blur(10px)",
boxShadow:"0 10px 30px rgba(0,0,0,0.4)"
};

const rideTop = {
display:"flex",
justifyContent:"space-between",
marginBottom:10
};

const rideVehicle = {
fontWeight:700,
fontSize:"15px",
letterSpacing:"0.3px"
};

const statusBadge = {
padding:"6px 14px",
borderRadius:"999px",
fontSize:"12px",
fontWeight:"600",
color:"#fff",
letterSpacing:"0.5px"
};

const detailRow = {
display:"flex",
justifyContent:"space-between",
marginBottom:6,
fontSize:13
};

const detailLabel = {opacity:0.6};

const detailValue = {fontWeight:500};

const row = {
display:"flex",
justifyContent:"space-between",
padding:"14px 0",
borderBottom:"1px solid rgba(255,255,255,0.05)",
cursor:"pointer"
};
const card = {
background:"linear-gradient(145deg,#111827,#020617)",
borderRadius:"18px",
padding:"24px",
border:"1px solid rgba(255,255,255,0.06)",
boxShadow:"0 10px 30px rgba(0,0,0,0.5)"
};

const empty = {
padding:16,
opacity:0.6
};