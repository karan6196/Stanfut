import { useEffect, useState } from "react";
import {
collection,
addDoc,
query,
where,
onSnapshot,
updateDoc,
doc,
serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";
import { useAuth } from "../components/context/AuthContext";

export default function PartnerVehicles(){

const { user } = useAuth();

const [vehicles,setVehicles] = useState([]);

const [name,setName] = useState("");
const [brand,setBrand] = useState("");
const [price,setPrice] = useState("");
const [deposit,setDeposit] = useState("");
const [location,setLocation] = useState("");
const [vehicleNumber,setVehicleNumber] = useState("");
const [type,setType] = useState("");
const [fuel,setFuel] = useState("");
const [image,setImage] = useState("");

/* LOAD VEHICLES */

useEffect(()=>{

if(!user) return;

const q = query(
collection(db,"vehicles"),
where("ownerId","==",user.uid)
);

const unsub = onSnapshot(q,(snap)=>{

const data = snap.docs.map(d=>({
id:d.id,
...d.data()
}));

setVehicles(data);

});

return ()=>unsub();

},[user]);

/* ADD VEHICLE */

const addVehicle = async()=>{

if(!name || !price || !brand) {
  alert("Please fill required fields");
  return;
}

await addDoc(collection(db,"vehicles"),{

name,
brand,
vehicleNumber,
type,
fuel,
image,
location,

pricePerDay:Number(price),
deposit:Number(deposit),

ownerId:user.uid,

available:true,
status:true,
rating:4.5,

createdAt:serverTimestamp()

});

setName("");
setBrand("");
setType("");
setFuel("");
setPrice("");
setDeposit("");
setLocation("");
setVehicleNumber("");
setImage("");

};
/* TOGGLE AVAILABILITY */

const toggleAvailability = async(v)=>{

await updateDoc(doc(db,"vehicles",v.id),{
available:!v.available
});

};

/* STATS */

const totalVehicles = vehicles.length;
const activeVehicles = vehicles.filter(v=>v.available).length;
const disabledVehicles = vehicles.filter(v=>!v.available).length;

/* UI */

return(

<div style={container}>

<h1 style={title}>My Vehicles</h1>

{/* STATS */}

<div style={statsRow}>

<div style={statCard}>
<h2>{totalVehicles}</h2>
<p>Total Vehicles</p>
</div>

<div style={statCard}>
<h2>{activeVehicles}</h2>
<p>Active</p>
</div>

<div style={statCard}>
<h2>{disabledVehicles}</h2>
<p>Disabled</p>
</div>

</div>

{/* ADD VEHICLE */}

<div style={addCard}>

<h2>Add Vehicle</h2>

<input
placeholder="Vehicle Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={input}
/>

<input
placeholder="Brand"
value={brand}
onChange={(e)=>setBrand(e.target.value)}
style={input}
/>

<input
placeholder="Price Per Day"
value={price}
onChange={(e)=>setPrice(e.target.value)}
style={input}
/>

<input
placeholder="Deposit"
value={deposit}
onChange={(e)=>setDeposit(e.target.value)}
style={input}
/>

<input
placeholder="Location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
style={input}
/>

<input
placeholder="Vehicle Type (car/bike/ev)"
value={type}
onChange={(e)=>setType(e.target.value)}
style={input}
/>
<input
placeholder="Vehicle Number (PB10AB1234)"
value={vehicleNumber}
onChange={(e)=>setVehicleNumber(e.target.value)}
/>
<input
placeholder="Fuel Type (Petrol/Diesel/Electric)"
value={fuel}
onChange={(e)=>setFuel(e.target.value)}
style={input}
/>

<input
placeholder="Vehicle Image URL"
value={image}
onChange={(e)=>setImage(e.target.value)}
style={input}
/>

<button style={addBtn} onClick={addVehicle}>
Add Vehicle
</button>

</div>

{/* VEHICLE GRID */}

<h2 style={{marginTop:40}}>Your Vehicles</h2>

{vehicles.length === 0 && (
<div style={emptyState}>
<p>No vehicles added yet</p>
</div>
)}

<div style={vehicleGrid}>

{vehicles.map(v=>(

<div key={v.id} style={vehicleCard}>

<h3>{v.name}</h3>

<p style={brandText}>{v.brand}</p>

<p style={priceText}>₹{v.pricePerDay} / day</p>

<p style={meta}>Deposit ₹{v.deposit}</p>

<p style={meta}>{v.location}</p>

<div style={statusRow}>

<span
style={{
...statusBadge,
background: v.available ? "#22c55e" : "#ef4444"
}}
>
{v.available ? "Available" : "Disabled"}
</span>

<button
style={toggleBtn}
onClick={()=>toggleAvailability(v)}
>
{v.available ? "Disable" : "Enable"}
</button>

</div>

</div>

))}

</div>

</div>

);

}

/* ---------------- STYLES ---------------- */

const container={
padding:40,
color:"#fff"
};

const title={
fontSize:28,
fontWeight:800
};

const statsRow={
display:"flex",
gap:20,
marginTop:30
};

const statCard={
flex:1,
background:"#0f172a",
padding:20,
borderRadius:12,
border:"1px solid rgba(255,255,255,0.08)"
};

const addCard={
marginTop:40,
background:"#0f172a",
padding:24,
borderRadius:14,
maxWidth:420,
display:"grid",
gap:10
};

const input={
padding:12,
borderRadius:8,
border:"1px solid #334155",
background:"#020617",
color:"#fff"
};

const addBtn={
marginTop:10,
padding:12,
background:"#22c55e",
border:"none",
borderRadius:8,
color:"#fff",
fontWeight:700,
cursor:"pointer"
};

const vehicleGrid={
display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
gap:20,
marginTop:20
};

const vehicleCard={
background:"#0f172a",
padding:20,
borderRadius:12,
border:"1px solid rgba(255,255,255,0.05)"
};

const brandText={
opacity:0.7
};

const priceText={
fontWeight:700,
marginTop:4
};

const meta={
opacity:0.6,
fontSize:13
};

const statusRow={
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginTop:12
};

const statusBadge={
padding:"4px 10px",
borderRadius:6,
fontSize:12,
fontWeight:700,
color:"#fff"
};

const toggleBtn={
background:"#3b82f6",
border:"none",
color:"#fff",
padding:"6px 10px",
borderRadius:6,
cursor:"pointer"
};

const emptyState={
marginTop:20,
opacity:0.6
};