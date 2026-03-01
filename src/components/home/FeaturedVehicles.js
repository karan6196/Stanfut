import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VehicleCard from "../vehicle/VehicleCard";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FeaturedVehicles() {

const navigate = useNavigate();

const [vehicles, setVehicles] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

const fetchVehicles = async () => {

try {

const snap = await getDocs(collection(db, "vehicles"));

const list = snap.docs.map(doc => ({
id: doc.id,
...doc.data()
}));

setVehicles(list.slice(0, 8));

} catch (err) {

console.log(err);

} finally {

setLoading(false);

}

};

fetchVehicles();

}, []);

return (

<section style={wrap}>

{/* HEADER */}
<div style={header}>

<div>

<h2 style={title}>
Featured Vehicles
</h2>

<p style={subtitle}>
Premium rides selected for you
</p>

</div>

<button
style={viewBtn}
onClick={() => navigate("/vehicles")}
>
View All →
</button>

</div>

{/* SCROLL CONTAINER */}
<div style={scrollContainer}>

{loading ? (

<div style={loadingWrap}>
<div style={loader}></div>
<p style={loadingText}>Loading premium vehicles...</p>
</div>

) : vehicles.length === 0 ? (

<div style={emptyBox}>
No vehicles available
</div>

) : (

vehicles.map(vehicle => (

<div key={vehicle.id} style={cardOuter}>

<div style={cardInner}>
<VehicleCard vehicle={vehicle} />
</div>

</div>

))

)}

</div>

</section>

);

}

/* PREMIUM STYLES */

const wrap = {
  marginTop: "42px",
  padding: "36px",
  borderRadius: "24px",

  background: "linear-gradient(135deg, #0f172a, #111827)",

  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
};
const header = {

display: "flex",

justifyContent: "space-between",

alignItems: "center",

marginBottom: "24px",

flexWrap: "wrap",

gap: "12px",

};

const title = {

margin: 0,

fontSize: "26px",

fontWeight: 900,

letterSpacing: "-0.5px",

background: "linear-gradient(135deg,#1d4ed8,#10b981)",

WebkitBackgroundClip: "text",

WebkitTextFillColor: "transparent",

};

const subtitle = {
  marginTop: "6px",
  color: "#94a3b8",
  fontSize: "14px",
};

const viewBtn = {

padding: "12px 20px",

borderRadius: "14px",

border: "none",

background: "linear-gradient(135deg,#1d4ed8,#10b981)",

color: "#fff",

fontWeight: 800,

cursor: "pointer",

boxShadow: "0 8px 24px rgba(0,0,0,0.18)",

transition: "0.25s",

};

const scrollContainer = {

display: "flex",

gap: "22px",

overflowX: "auto",

paddingBottom: "10px",

scrollBehavior: "smooth",

};

const cardOuter = {

minWidth: "300px",

};

const cardInner = {

borderRadius: "20px",

overflow: "hidden",

transition: "0.35s",

};

const loadingWrap = {

padding: "40px",

textAlign: "center",

width: "100%",

};

const loader = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "4px solid rgba(255,255,255,0.1)",
  borderTop: "4px solid #3b82f6",
  animation: "spin 1s linear infinite",
  margin: "0 auto",
};

const loadingText = {

marginTop: "12px",

color: "#64748b",

};

const emptyBox = {
  padding: "30px",
  background: "#1e293b",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#f1f5f9",
};
