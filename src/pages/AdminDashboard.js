import { useEffect, useState } from "react";
import {
collection,
query,
orderBy,
onSnapshot,
doc,
updateDoc,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

export default function AdminDashboard() {

const [bookings,setBookings] = useState([]);
const [search,setSearch] = useState("");
const [statusFilter,setStatusFilter] = useState("all");
const [lastBookingId,setLastBookingId] = useState(null);

/* ---------------- REALTIME BOOKINGS ---------------- */

useEffect(()=>{

const q = query(
collection(db,"bookings"),
orderBy("createdAt","desc")
);

const unsubscribe = onSnapshot(q,(snapshot)=>{

const data = snapshot.docs.map(d=>({
id:d.id,
...d.data()
}));

setBookings(data);

/* NEW BOOKING ALERT */

if(data.length > 0){

if(lastBookingId && data[0].id !== lastBookingId){

const b = data[0];

alert(`🔔 NEW BOOKING

User: ${b.userName}
Vehicle: ${b.vehicleName}
Verification Code: ${b.verificationCode}`);

}

setLastBookingId(data[0].id);

}

});

return ()=>unsubscribe();

},[lastBookingId]);

/* ---------------- FORMAT TIME ---------------- */

const formatTime = (t) => {

if(!t) return "—";

if(t.seconds) return new Date(t.seconds*1000).toLocaleString();

if(t._seconds) return new Date(t._seconds*1000).toLocaleString();

return new Date(t).toLocaleString();

};

/* ---------------- CLEAN STATUS ---------------- */
const cleanStatus = (status) => {

if(!status) return "Confirmed";

const s = status.toLowerCase();

if(s.includes("driver")) return "Driver Assigned";

if(s.includes("start")) return "Ride Started";

if(s.includes("complete")) return "Ride Completed";

if(s.includes("confirm")) return "Confirmed";

return "Confirmed";

};

/* ---------------- CHECK VEHICLE CONFLICT ---------------- */

const checkConflict = (vehicleId,start,end) => {

if(!start || !end) return false;

const newStart = new Date(start.seconds ? start.seconds*1000 : start).getTime();
const newEnd = new Date(end.seconds ? end.seconds*1000 : end).getTime();

return bookings.some(b => {

if(b.vehicleId !== vehicleId) return false;

const oldStart = new Date(b.startTime?.seconds ? b.startTime.seconds*1000 : b.startTime).getTime();
const oldEnd = new Date(b.endTime?.seconds ? b.endTime.seconds*1000 : b.endTime).getTime();

return newStart < oldEnd && newEnd > oldStart;

});

};

/* ---------------- STATUS UPDATE ---------------- */

const updateStatus = async (id,status) => {

await updateDoc(doc(db,"bookings",id),{
status,
updatedAt:serverTimestamp()
});

};

/* ---------------- STATS ---------------- */

const totalBookings = bookings.length;

const confirmedCount = bookings.filter(
b=>cleanStatus(b.status)==="Confirmed"
).length;

const startedCount = bookings.filter(
b=>cleanStatus(b.status)==="Ride Started"
).length;

const completedCount = bookings.filter(
b=>cleanStatus(b.status)==="Ride Completed"
).length;

const totalRevenue = bookings
.filter(b=>cleanStatus(b.status)==="Ride Completed")
.reduce((sum,b)=>sum+(b.adminRevenue || 0),0);

/* ---------------- FILTER ---------------- */

const filteredBookings = bookings.filter(b=>{

const s = search.toLowerCase();

return (

b.id?.toLowerCase().includes(s) ||
b.vehicleName?.toLowerCase().includes(s) ||
b.userName?.toLowerCase().includes(s) ||
b.verificationCode?.toString().includes(s)

) && (statusFilter==="all" || cleanStatus(b.status)===statusFilter);

});

/* ---------------- UI ---------------- */

return (

<div style={container}>

<h1 style={title}>Admin Dashboard</h1>

{/* STATS */}

<div style={statsRow}>

<Stat label="Total Bookings" value={totalBookings} />
<Stat label="Confirmed" value={confirmedCount} />
<Stat label="Ride Started" value={startedCount} />
<Stat label="Completed" value={completedCount} />
<Stat label="Revenue" value={`₹${totalRevenue}`} />

</div>

{/* FILTERS */}

<div style={filters}>

<input
placeholder="Search booking / user / vehicle / code"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={input}
/>

<select
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
style={input}
>
<option value="all">All Status</option>
<option value="Confirmed">Confirmed</option>
<option value="Ride Started">Ride Started</option>
<option value="Ride Completed">Ride Completed</option>
</select>

</div>

{/* TABLE */}

<div style={tableWrapper}>

<table style={table}>

<thead>

<tr>
<th>User</th>
<th>Booking</th>
<th>Vehicle</th>
<th>Vehicle No</th>
<th>Availability</th>
<th>Pickup</th>
<th>Drop</th>
<th>Amount</th>
<th>Code</th>
<th>Status</th>
<th>Actions</th>
<th>Total Rent</th>
<th>Admin Revenue</th>
<th>Partner Revenue</th>
<th>Amount to Refund</th>
</tr>

</thead>

<tbody>

{filteredBookings.map(b=>(

<tr key={b.id}>

<td>{b.userName}</td>

<td>{b.id.slice(0,8)}...</td>

<td>{b.vehicleName}</td>
<td>{b.vehicleNumber}</td>

<td>
<span style={{
padding:"6px 10px",
borderRadius:6,
background: checkConflict(b.vehicleId,b.startTime,b.endTime)
? "#ef4444"
: "#22c55e",
color:"#fff",
fontSize:12
}}>
{checkConflict(b.vehicleId,b.startTime,b.endTime)
? "Conflict"
: "Available"}
</span>
</td>

<td>{formatTime(b.startTime)}</td>

<td>{formatTime(b.endTime)}</td>

<td>₹{b.finalPayable || b.totalRent}</td>

<td style={{fontWeight:"bold"}}>{b.verificationCode}</td>

<td>
<span style={{
...badge,
background:
cleanStatus(b.status)==="Confirmed" ? "#f59e0b" :
cleanStatus(b.status)==="Ride Started" ? "#3b82f6" :
cleanStatus(b.status)==="Ride Completed" ? "#22c55e" :
"#64748b"
}}>
{cleanStatus(b.status)}
</span>
</td>

<td style={actions}>
<button
style={greenBtn}
onClick={()=>{

const msg = `🚗 STANFUT BOOKING

Vehicle: ${b.vehicleName}
Booking ID: ${b.id}
Verification Code: ${b.verificationCode}

Pickup: ${formatTime(b.startTime)}
Drop: ${formatTime(b.endTime)}

Customer: ${b.userName}
Amount: ₹${b.finalPayable || b.totalRent}`;

window.open(
"https://wa.me/?text="+encodeURIComponent(msg),
"_blank"
);

}}
>
Send To Partner
</button>

<button
style={{
...blueBtn,
opacity: cleanStatus(b.status)!=="Confirmed"?0.4:1
}}
disabled={cleanStatus(b.status)!=="Confirmed"}
onClick={()=>updateStatus(b.id,"Ride Started")}
>
Start Ride
</button>

<button
style={{
...darkGreenBtn,
opacity: cleanStatus(b.status)!=="Ride Started"?0.4:1
}}
disabled={cleanStatus(b.status)!=="Ride Started"}
onClick={()=>updateStatus(b.id,"Ride Completed")}
>
Complete
</button>

</td>
{/* ADD THESE HERE */}

<td>₹{b.totalRent || 0}</td>

<td style={{color:"#38bdf8",fontWeight:"bold"}}>
₹{b.adminRevenue || 0}
</td>

<td style={{color:"#22c55e",fontWeight:"bold"}}>
₹{b.partnerRevenue || 0}
</td>

<td style={{color:"#f59e0b",fontWeight:"bold"}}>
₹{b.refundAmount || 0}
</td>
</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

/* STAT COMPONENT */

function Stat({label,value}){

return(

<div style={statCard}>
<div style={statValue}>{value}</div>
<div style={statLabel}>{label}</div>

</div>

);

}

/* STYLES */

const container={padding:40,color:"#fff",background:"#020617",minHeight:"100vh"};
const title={fontSize:28,fontWeight:800};
const statsRow={display:"flex",gap:20,marginTop:30};

const statCard={
flex:1,
background:"#0f172a",
padding:20,
borderRadius:12,
border:"1px solid rgba(255,255,255,0.08)"
};

const statValue={fontSize:24,fontWeight:800};
const statLabel={fontSize:14,opacity:0.7};

const filters={display:"flex",gap:12,marginTop:30};

const input={padding:10,borderRadius:8,border:"1px solid #ccc"};

const tableWrapper={marginTop:30,background:"#0f172a",borderRadius:12,overflow:"hidden"};

const table={width:"100%",borderCollapse:"collapse"};

const badge={
padding:"6px 10px",
borderRadius:6,
color:"#fff",
fontSize:12,
fontWeight:700
};

const actions={display:"flex",gap:8};

const greenBtn={background:"#22c55e",border:"none",color:"#fff",padding:"6px 10px",borderRadius:6,cursor:"pointer"};
const blueBtn={background:"#3b82f6",border:"none",color:"#fff",padding:"6px 10px",borderRadius:6,cursor:"pointer"};
const darkGreenBtn={background:"#16a34a",border:"none",color:"#fff",padding:"6px 10px",borderRadius:6,cursor:"pointer"};