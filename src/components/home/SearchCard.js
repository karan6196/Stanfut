import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCard() {

const navigate = useNavigate();

const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
const [type, setType] = useState("all");

const handleSearch = () => {

if (!startTime || !endTime) {
alert("Please select start and end time");
return;
}

const url = type === "all"
? "/vehicles"
: `/vehicles?type=${type}`;

navigate(url, {
state: { startTime, endTime },
});

};

return (

<div style={wrap}>

{/* Header */}
<div style={head}>

<div>
<h2 style={title}>Search Vehicles</h2>

<p style={subtitle}>
Select timing once • Checkout becomes instant ⚡
</p>

</div>

<div style={badge}>
Fast Booking
</div>

</div>

{/* Fields */}
<div style={grid}>

<Field
label="Start Date & Time"
value={startTime}
onChange={setStartTime}
/>

<Field
label="End Date & Time"
value={endTime}
onChange={setEndTime}
/>

{/* Type */}
<div style={field}>

<label style={labelStyle}>
Vehicle Type
</label>

<select
value={type}
onChange={(e) => setType(e.target.value)}
style={input}
>

<option value="all">All Vehicles</option>
<option value="bike">Bikes</option>
<option value="car">Cars</option>
<option value="ev">EVs</option>

</select>

</div>

</div>

{/* CTA */}
<button
style={cta}
onClick={handleSearch}
>

Search Available Vehicles →

</button>

<p style={tip}>
Tip: Book early morning for best availability 🚀
</p>

</div>

);

}

/* Field component */
function Field({ label, value, onChange }) {

return (

<div style={field}>

<label style={labelStyle}>
{label}
</label>

<input
type="datetime-local"
value={value}
onChange={(e) => onChange(e.target.value)}
style={input}
/>

</div>

);

}

/* STYLES */

const wrap = {
background: "linear-gradient(135deg, rgba(29,78,216,0.06), rgba(16,185,129,0.06))",
borderRadius: "20px",
padding: "26px",
border: "1px solid rgba(255,255,255,0.6)",
boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
backdropFilter: "blur(12px)",
marginBottom: "26px",
};

const head = {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "20px",
flexWrap: "wrap",
gap: "10px",
};

const title = {
margin: 0,
fontSize: "22px",
fontWeight: 800,
};

const subtitle = {
margin: "6px 0 0",
color: "#64748b",
};

const badge = {
background: "linear-gradient(135deg, #1d4ed8, #10b981)",
color: "#fff",
padding: "8px 14px",
borderRadius: "999px",
fontWeight: 700,
fontSize: "13px",
boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
};

const grid = {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
gap: "16px",
};

const field = {
display: "flex",
flexDirection: "column",
};

const labelStyle = {
fontSize: "13px",
marginBottom: "6px",
color: "#64748b",
fontWeight: 600,
};

const input = {
padding: "12px",
borderRadius: "12px",
border: "1px solid rgba(0,0,0,0.08)",
fontSize: "14px",
outline: "none",
background: "#fff",
};

const cta = {
marginTop: "20px",
padding: "14px",
borderRadius: "14px",
border: "none",
background: "linear-gradient(135deg, #1d4ed8, #10b981)",
color: "#fff",
fontWeight: 800,
fontSize: "15px",
cursor: "pointer",
boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
};

const tip = {
marginTop: "12px",
color: "#64748b",
fontSize: "13px",
};
