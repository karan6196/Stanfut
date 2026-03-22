import { useEffect, useState } from "react";
import {
collection,
query,
where,
onSnapshot,
doc,
updateDoc,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";
import { useAuth } from "../components/context/AuthContext";

export default function PartnerDashboard(){

const { user } = useAuth();

const [bookings,setBookings] = useState([]);
const [statusFilter, setStatusFilter] = useState("all");
const [searchInput, setSearchInput] = useState("");
/* ---------------- LOAD PARTNER BOOKINGS ---------------- */

useEffect(()=>{

if(!user) return;

const q = query(
collection(db,"bookings"),
where("partnerId","==",user.uid)
);

const unsub = onSnapshot(q,(snap)=>{

const data = snap.docs.map(d=>({
id:d.id,
...d.data()
}));

setBookings(data);

});

return ()=>unsub();

},[user]);

/* ---------------- FORMAT TIME ---------------- */

const formatTime = (t)=>{

if(!t) return "—";

if(t.seconds) return new Date(t.seconds*1000).toLocaleString();

return new Date(t).toLocaleString();

};

/* ---------------- UPDATE STATUS ---------------- */

const updateStatus = async(id,status)=>{

await updateDoc(doc(db,"bookings",id),{
status,
updatedAt:serverTimestamp()
});

};

/* ---------------- STATS ---------------- */

const totalBookings = bookings.length;

const active = bookings.filter(
b=>b.status==="Confirmed" || b.status==="Ride Started"
).length;

const completed = bookings.filter(
b=>b.status==="Ride Completed"
).length;

const earnings = bookings
.filter(b=>b.status==="Ride Completed")
.reduce((sum,b)=>sum+(b.partnerRevenue||0),0);

/* ---------------- UI ---------------- */
/* ---------------- SORT + FILTER ---------------- */

const sortedBookings = [...bookings].sort((a, b) => {
  const aTime = new Date(a.createdAt || a.startTime).getTime();
  const bTime = new Date(b.createdAt || b.startTime).getTime();
  return bTime - aTime;
});

const filteredBookings = sortedBookings.filter(b => {
  const matchStatus =
    statusFilter === "all" || b.status === statusFilter;

  const matchSearch =
    b.vehicleName?.toLowerCase().includes(searchInput.toLowerCase()) ||
    b.userName?.toLowerCase().includes(searchInput.toLowerCase());

  return matchStatus && matchSearch;
});


const exportCSV = () => {

  if(filteredBookings.length === 0){
    alert("No data to export");
    return;
  }

  const headers = [
    "Customer",
    "Vehicle",
    "Vehicle Number",
    "Pickup",
    "Drop",
    "Location",
    "Code",
    "Status"
  ];

  const rows = filteredBookings.map(b => [
    b.userName,
    b.vehicleName,
    b.vehicleNumber || "N/A",
    formatTime(b.startTime),
    formatTime(b.endTime),
    b.userLocation
      ? `${b.userLocation.lat},${b.userLocation.lng}`
      : "No location",
    b.verificationCode,
    b.status
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows]
      .map(row => row.map(val => `"${val}"`).join(","))
      .join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "bookings.csv";
  link.click();
};
return(

<div style={container}>

<h1 style={title}>Partner Dashboard</h1>

<div style={navBar}>

<button
style={navBtn}
onClick={()=>window.location.href="/partner"}
>
Dashboard
</button>

<button
style={navBtn}
onClick={()=>window.location.href="/partner/vehicles"}
>
My Vehicles
</button>

</div>

{/* STATS */}

<div style={stats}>

<Card title="Bookings" value={totalBookings}/>
<Card title="Active Rides" value={active}/>
<Card title="Completed" value={completed}/>
<Card title="Earnings" value={`₹${earnings}`}/>

</div>
<div style={filterBar}>

  <button onClick={()=>setStatusFilter("all")} style={filterBtn}>
    All
  </button>

  <button onClick={()=>setStatusFilter("Confirmed")} style={filterBtn}>
    Confirmed
  </button>

  <button onClick={()=>setStatusFilter("Ride Started")} style={filterBtn}>
    Active
  </button>

  <button onClick={()=>setStatusFilter("Ride Completed")} style={filterBtn}>
    Completed
  </button>

</div>
<input
  placeholder="Search vehicle / customer..."
  value={searchInput}
  onChange={(e)=>setSearchInput(e.target.value)}
  style={searchBox}
/>


<div style={topBar}>

  <div style={{display:"flex", gap:"10px"}}>
    {/* filters already above */}
  </div>

  <button style={exportBtn} onClick={exportCSV}>
    ⬇ Export CSV
  </button>

</div>
{/* TABLE */}
<div style={tableWrap}>
<table style={table}>

<thead>

<tr>
<th  style={headerCell}>Customer</th>
<th  style={headerCell}>Vehicle</th>
<th  style={headerCell}>Vehicle No</th>
<th  style={headerCell}>Pickup</th>
<th  style={headerCell}>Drop</th>
<th  style={headerCell}>Delivery Location</th>
<th  style={headerCell}>Code</th>
<th  style={headerCell}>Status</th>
<th  style={headerCell}>Actions</th>
</tr>

</thead>

<tbody>

{filteredBookings.map(b => (

<tr
  key={b.id}
  style={row}
  onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.01)"}
  onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
>
<td style={cell}>{b.userName}</td>

<td style={cell}>{b.vehicleName}</td>

<td style={cell}>{b.vehicleNumber || "Not Assigned"}</td>

<td style={cell}>{formatTime(b.startTime)}</td>

<td style={cell}>{formatTime(b.endTime)}</td>

<td style={cell}>
  {b.userLocation ? (
    <a
      href={`https://www.google.com/maps?q=${b.userLocation.lat},${b.userLocation.lng}`}
      target="_blank"
      rel="noreferrer"
      style={{ color: "#3b82f6", fontWeight: "bold" }}
    >
      Open Map
    </a>
  ) : "No location"}
</td>

<td style={cell}>{b.verificationCode}</td>

<td style={cell}>
  <span style={{
    padding:"6px 10px",
    borderRadius:"999px",
    background:
      b.status==="Ride Completed" ? "#16a34a" :
      b.status==="Ride Started" ? "#f59e0b" :
      b.status==="Confirmed" ? "#3b82f6" :
      "#64748b",
    color:"#fff",
    fontSize:"12px",
    fontWeight:"700"
  }}>
    {b.status}
  </span>
</td><td style={{display:"flex",gap:8}}>

<button
style={{...actionBtn, background:"#3b82f6"}}
disabled={b.status!=="Confirmed"}
onClick={()=>updateStatus(b.id,"Ride Started")}
>
Start
</button>

<button
style={{...actionBtn, background:"#16a34a"}}
disabled={b.status!=="Ride Started"}
onClick={async ()=>{

await updateStatus(b.id,"Ride Completed");

await updateDoc(doc(db,"vehicles",b.vehicleId),{
available:true
});

}}
>
Done
</button>

<button
style={{...actionBtn, background:"#8b5cf6"}}
disabled={b.status !== "Pending Partner Confirmation"}
onClick={async ()=>{

await updateStatus(b.id,"Confirmed");

await updateDoc(doc(db,"vehicles",b.vehicleId),{
available:false
});

}}
>
Confirm
</button>

</td>

</tr>

))}

</tbody>
</table>
</div>
</div>

);

}

/* ---------- STAT CARD ---------- */

function Card({title,value}){

return(

<div style={card}>
<div style={cardValue}>{value}</div>
<div style={cardLabel}>{title}</div>
</div>

);

}

/* ---------- STYLES ---------- */

const container={
padding:40,
background:"#020617",
color:"#fff",
minHeight:"100vh"
};

const title={
fontSize:28,
fontWeight:800
};

const stats={
display:"flex",
gap:20,
marginTop:30
};

const cardValue={
fontSize:22,
fontWeight:800
};

const cardLabel={
fontSize:13,
opacity:0.7
};

const blueBtn={
background:"#3b82f6",
border:"none",
color:"#fff",
padding:"6px 10px",
borderRadius:6
};

const greenBtn={
background:"#16a34a",
border:"none",
color:"#fff",
padding:"6px 10px",
borderRadius:6
};
const navBar={
display:"flex",
gap:12,
marginTop:20,
marginBottom:20
};

const navBtn={
padding:"10px 16px",
borderRadius:10,
border:"none",
background:"#2563eb",
color:"#fff",
fontWeight:600,
cursor:"pointer"
};
const filterBar = {
  display: "flex",
  gap: "10px",
  marginTop: "20px"
};

const filterBtn = {
  padding: "8px 14px",
  borderRadius: "999px",
  border: "none",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600
};

const cell = {
  padding: "14px 12px",
  fontSize: "14px",
  color: "#e2e8f0",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  borderBottom: "1px solid rgba(255,255,255,0.05)"
};
const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 12px"
};

const headerCell = {
  position: "sticky",
  top: 0,
  background: "#020617",
  zIndex: 2,
  textAlign: "left",
  padding: "12px",
  fontSize: "12px",
  color: "#94a3b8",
  fontWeight: "600"
};
const row = {
  background: "linear-gradient(145deg,#0f172a,#020617)",
  transition: "0.2s",
  cursor: "pointer"
};
const actionBtn = {
  padding: "6px 12px",
  borderRadius: "999px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer"
};
const tableWrap = {
  marginTop: "20px",
  maxHeight: "70vh",
  overflowY: "auto",
  background: "rgba(15,23,42,0.7)",
  borderRadius: "20px",
  padding: "20px"
};
const card = {
  flex:1,
  padding:20,
  borderRadius:16,
  background:"linear-gradient(135deg,#0f172a,#020617)",
  border:"1px solid rgba(255,255,255,0.06)"
};
const searchBox = {
  width: "100%",
  padding: "12px 16px",
  marginTop: "16px",
  marginBottom: "10px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontSize: "14px",
  outline: "none"
};
const exportBtn = {
  padding: "10px 16px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(34,197,94,0.4)"
};
const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px"
};