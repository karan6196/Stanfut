import { useSearchParams, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import {
collection,
getDocs,
query,
where,
onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

import { FaCarSide, FaMotorcycle } from "react-icons/fa";

import VehicleCard from "../components/vehicle/VehicleCard";
import FilterBar from "../components/vehicle/FilterBar";

import Skeleton from "../components/ui/Skeleton";

export default function VehicleList() {

const [searchParams] = useSearchParams();
const location = useLocation();

const bookingTime = location.state;

const type = searchParams.get("type");

/* ---------------- STATE ---------------- */

const [vehicles, setVehicles] = useState([]);
const [loading, setLoading] = useState(true);

const [bookedMap, setBookedMap] = useState({});
const [hideBooked, setHideBooked] = useState(false);

/* FILTER STATES */

const [sort, setSort] = useState("");
const [fuel, setFuel] = useState("");
const [locFilter, setLocFilter] = useState("");
const [rating, setRating] = useState("");
const [verifiedOnly, setVerifiedOnly] = useState(false);

const [price, setPrice] = useState(999999);

/* ---------------- FETCH VEHICLES ---------------- */

useEffect(() => {

const fetch = async () => {

try {

const q = query(
  collection(db, "vehicles"),
  where("available", "==", true)
);

const snap = await getDocs(q);

const list = snap.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));

setVehicles(list);

}
catch(err){
console.log(err);
}

setLoading(false);

};

fetch();

}, []);

/* ---------------- BOOKINGS LISTENER ---------------- */

useEffect(() => {

if (!bookingTime?.startTime || !bookingTime?.endTime) {
setBookedMap({});
return;
}

const start = new Date(bookingTime.startTime).getTime();
const end = new Date(bookingTime.endTime).getTime();

const q = query(
collection(db, "bookings"),
where("status", "in", [
  "Pending Partner Confirmation",
  "Confirmed",
  "Ride Started"
]));

const unsub = onSnapshot(q, snap => {

const map = {};

snap.docs.forEach(d => {

const b = d.data();

const oldStart =
typeof b.startTime?.toDate==="function"
? b.startTime.toDate().getTime()
: new Date(b.startTime).getTime();

const oldEnd =
typeof b.endTime?.toDate==="function"
? b.endTime.toDate().getTime()
: new Date(b.endTime).getTime();

if (start < oldEnd && end > oldStart)
map[String(b.vehicleId)] = true;

});

setBookedMap(map);

});

return () => unsub();

}, [bookingTime]);

/* ---------------- LOCATIONS ---------------- */

const locations = useMemo(() => {

return [
...new Set(
vehicles
.map(v => v.location)
.filter(Boolean)
)
];

}, [vehicles]);

/* ---------------- PRICE RANGE ---------------- */

const minPrice = useMemo(() => {

if(vehicles.length===0) return 0;

return Math.min(
...vehicles.map(v=>Number(v.pricePerDay)||0)
);

},[vehicles]);

const maxPrice = useMemo(() => {

if(vehicles.length===0) return 0;

return Math.max(
...vehicles.map(v=>Number(v.pricePerDay)||0)
);

},[vehicles]);

useEffect(()=>{
setPrice(maxPrice);
},[maxPrice]);

/* ---------------- FILTER LOGIC ---------------- */

const filtered = useMemo(() => {

let list = [...vehicles];

if (type)
list = list.filter(v =>
String(v.type).toLowerCase()
=== String(type).toLowerCase()
);

if (fuel)
list = list.filter(v => v.fuel === fuel);

if (locFilter)
list = list.filter(v => v.location === locFilter);

if (rating)
list = list.filter(v =>
Number(v.rating) >= Number(rating)
);

if (verifiedOnly)
list = list.filter(v => v.verified === true);


list = list.filter(v =>
Number(v.pricePerDay) <= price
);

list = list.filter(v =>
!bookedMap[String(v.id)]
);

if(sort==="priceLow")
list.sort((a,b)=>a.pricePerDay-b.pricePerDay);

if(sort==="priceHigh")
list.sort((a,b)=>b.pricePerDay-a.pricePerDay);

if(sort==="ratingHigh")
list.sort((a,b)=>(b.rating||0)-(a.rating||0));

return list;

},[
vehicles,
type,
fuel,
locFilter,
rating,
verifiedOnly,
price,
sort,
hideBooked,
bookedMap
]);

/* ---------------- COUNTS ---------------- */

const total = filtered.length;

const available = filtered.filter(v =>
!bookedMap[String(v.id)]
).length;

/* ---------------- UI ---------------- */

return (
<>
<div
  className="container"
  style={{
    minHeight: "100vh",
    paddingBottom: "60px"
  }}
>

{/* HEADER */}
<div style={headerBox}>

<div>

<h2
  style={{
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}
>
  {type?.toLowerCase() === "bike" ? (
    <FaMotorcycle size={26} />
  ) : (
    <FaCarSide size={26} />
  )}
  {total} Vehicles Found
</h2>

<p style={subText}>
Available: {available}
</p>

</div>

<button
onClick={()=>setHideBooked(p=>!p)}
style={{
...toggleBtn,
background:hideBooked
?"linear-gradient(135deg,#10b981,#06b6d4)"
:"#e2e8f0",
color:hideBooked?"#fff":"#0f172a"
}}
>
{hideBooked
?"Showing Available Only"
:"Hide Booked Vehicles"}
</button>

</div>

{/* FILTER BAR */}
<FilterBar

sort={sort}
onSortChange={setSort}

fuel={fuel}
onFuelChange={setFuel}

location={locFilter}
onLocationChange={setLocFilter}

locations={locations}

rating={rating}
onRatingChange={setRating}

verifiedOnly={verifiedOnly}
onVerifiedChange={setVerifiedOnly}

price={price}
onPriceChange={setPrice}

minPrice={minPrice}
maxPrice={maxPrice}

/>

{/* GRID */}

{loading ? (

<Skeleton height="200px"/>

) : filtered.length===0 ? (

<div style={empty}>

<h3>No vehicles found</h3>
<p className="small">
Try changing filters
</p>

</div>

) : (

<div style={grid}>

{filtered.map(v => (

<VehicleCard
key={v.id}
vehicle={v}
bookingTime={bookingTime}
isBooked={!!bookedMap[String(v.id)]}
/>

))}

</div>

)}

</div>

</>
);

}

/* STYLES */

const headerBox = {
  padding: "22px",
  borderRadius: "20px",
  marginBottom: "22px",
  background: "rgba(15,23,42,0.7)",   // dark glass instead of faint tint
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
};

const subText = {
  margin: "6px 0 0",
  color: "#cbd5e1"
};
const toggleBtn={
padding:"10px 16px",
borderRadius:"12px",
border:"none",
fontWeight:"700",
cursor:"pointer"
};

const grid={
display:"grid",
gridTemplateColumns:
"repeat(auto-fill,minmax(280px,1fr))",
gap:"20px"
};

const empty={
  padding:"40px",
  textAlign:"center",
  borderRadius:"20px",
  background:"rgba(15,23,42,0.75)",
  border:"1px solid rgba(255,255,255,0.08)",
  boxShadow:"0 10px 30px rgba(0,0,0,0.4)",
  color:"#fff"
};
