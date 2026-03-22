import { useNavigate } from "react-router-dom";
import { useBookings } from "../components/context/BookingContext";
import { useState } from "react";
import BookingDetailsModal from "../components/BookingDetailsModal";
import { FiTruck } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";
export default function Bookings() {
  const navigate = useNavigate();
  const { bookings = [], loading, removeBooking } = useBookings();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
const [selectedBooking, setSelectedBooking] = useState(null);
const [tab,setTab] = useState("pending");

  /* ---------- LOADING ---------- */

  if (loading) {
    return (
      <div className="container">
        <h2>Loading bookings...</h2>
      </div>
    );
  }

  /* ---------- SPLIT BOOKINGS ---------- */

  const pending = bookings.filter(
    (b) => b.status === "Draft" || b.status === "Ready"
  );

 const active = bookings.filter(
  (b) =>
    b.status === "Confirmed" ||
    b.status === "Ride Started" ||
    b.status === "Pending Partner Confirmation"
);
const completed = bookings.filter(
  (b) => b.status?.toLowerCase().includes("complete")
);

  /* ---------- TOTAL SPENT ---------- */

  const totalSpent = completed.reduce(
    (sum, b) => sum + ((b.totalRent || 0) + (b.deposit || 0)),
    0
  );

  /* ---------- FORMAT DATE ---------- */

  function formatDate(t) {
    if (!t) return "Not set";

    try {
      const d =
        typeof t?.toDate === "function"
          ? t.toDate()
          : new Date(t);

      return d.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return "Invalid";
    }
  }

  /* ---------- SMART STATUS ---------- */

  function getSmartStatus(b) {
    const now = new Date();

    const start =
      typeof b.startTime?.toDate === "function"
        ? b.startTime.toDate()
        : new Date(b.startTime);

    const end =
      typeof b.endTime?.toDate === "function"
        ? b.endTime.toDate()
        : new Date(b.endTime);

    if (!start || !end || isNaN(start) || isNaN(end)) return null;

    if (now < start) {
      const diffHours = Math.round(
        (start - now) / (1000 * 60 * 60)
      );
      return `Starts in ${diffHours}h`;
    }

    if (now >= start && now <= end) {
      return "Ride in Progress";
    }

    return null;
  }

  /* ---------- STATUS BADGE ---------- */

  function StatusBadge({ status }) {
 const map = {
  Draft: { color: "#64748b", bg: "rgba(100,116,139,0.12)" },
  Ready: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  "Pending Partner Confirmation": { color: "#eab308", bg: "rgba(234,179,8,0.12)" },
  Confirmed: { color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
  "Ride Started": { color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  "Ride Completed": { color: "#16a34a", bg: "rgba(22,163,74,0.12)" }
};

    const s = map[status] || map.Draft;

    return (
      <div
        style={{
          padding: "5px 12px",
          borderRadius: "999px",
          fontWeight: "700",
          fontSize: "12px",
          background: s.bg,
          color: s.color,
        }}
      >
        {status}
      </div>
    );
  }

  /* ---------- BOOKING ROW ---------- */

  function BookingRow({ b }) {
    const smart = getSmartStatus(b);

    return (
      <div style={rowWrapper}>
        <div style={topRow}>
          <div>
            <h3 style={name}>{b.vehicleName}</h3>
            <p style={price}>₹{b.pricePerDay} / day</p>
            <p>Vehicle Number: {b.vehicleNumber}</p>
          </div>

          <StatusBadge status={b.status} />
        </div>

        {smart && (
          <div style={smartStatus}>
            {smart}
          </div>
        )}

        <div style={dateText}>
          {formatDate(b.startTime)} → {formatDate(b.endTime)}
        </div>

        <div style={bottomRow}>
          <div style={total}>
            ₹{(b.totalRent || 0) + (b.deposit || 0)}
          </div>

          <div style={actions}>

            {/* Draft or Ready */}
            {(b.status === "Draft" || b.status === "Ready") && (
              <>
                <button
                  style={primaryBtn}
                  onClick={() => navigate(`/checkout/${b.id}`)}
                >
                  Continue
                </button>

                <button
                  style={dangerBtn}
                  onClick={() => removeBooking(b.id)}
                >
                  Cancel
                </button>
              </>
            )}

            {/* Confirmed */}
            {b.status === "Confirmed" && (
              <button
                style={primaryBtn}
              onClick={() => {
  setSelectedBooking(b);
  setShowDetailsModal(true);
}}>
                View Details
              </button>
            )}

            {/* Paid */}
            {b.status === "Ride Completed" && (
              <>
                <button
                  style={primaryBtn}
                onClick={() => {
  setSelectedBooking(b);
  setShowDetailsModal(true);
}}>
                  View
                </button>

                <button
                  style={secondaryBtn}
                  onClick={() => navigate(`/vehicle/${b.vehicleId}`)}
                >
                  Rebook
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    );
  }

  /* ---------- EMPTY ---------- */

  function Empty() {
    return (
      <div style={empty}>
        <h3>No bookings yet</h3>
        <p style={{ color: "#94a3b8" }}>
          Book your first vehicle now
        </p>
      </div>
    );
  }

  /* ---------- UI ---------- */

  return (
    <div className="container">
      <h1 style={{ marginBottom: "20px" }}>My Bookings</h1>
{/* BOOKING TABS */}

<div style={tabs}>

<button
style={tab === "pending" ? activeTab : tabBtn}
onClick={()=>setTab("pending")}
>
Pending ({pending.length})
</button>

<button
style={tab === "active" ? activeTab : tabBtn}
onClick={()=>setTab("active")}
>
Active ({active.length})
</button>

<button
style={tab === "completed" ? activeTab : tabBtn}
onClick={()=>setTab("completed")}
>
Completed ({completed.length})
</button>

</div>
      {/* STATS */}
      <div style={statsRow}>
        <div style={statCard}>
          <div style={statValue}>{bookings.length}</div>
          <div style={statLabel}>Total Trips</div>
        </div>

        <div style={statCard}>
          <div style={statValue}>{active.length}</div>
          <div style={statLabel}>Confirmed</div>
        </div>

        <div style={statCard}>
          <div style={statValue}>₹{totalSpent}</div>
          <div style={statLabel}>Total Spent</div>
        </div>
      </div>

      {/* TAB CONTENT */}
<div style={tableWrapper}>

<table style={table}>

<thead>

<tr>
<th style={th}></th>
<th style={th}>Vehicle</th>
<th style={th}>Vehicle No</th>
<th style={th}>Pickup</th>
<th style={th}>Drop</th>
<th style={th}>Status</th>
<th style={th}>Amount</th>
<th style={th}>Action</th>
</tr>

</thead>

<tbody>

{(tab==="pending"?pending:tab==="active"?active:completed).length===0 ? (
<tr>
<td colSpan="7" style={{padding:30,textAlign:"center"}}>
No bookings
</td>
</tr>
) : (

(tab==="pending"?pending:tab==="active"?active:completed).map(b=>(
<tr key={b.id}>

<td style={td}>
<FaCarSide size={18} color="#38bdf8" /></td>

<td style={td}>{b.vehicleName}</td>

<td style={td}>{b.vehicleNumber || "-"}</td>

<td style={td}>{formatDate(b.startTime)}</td>

<td style={td}>{formatDate(b.endTime)}</td>

<td style={td}>
<StatusBadge status={b.status}/>
</td>

<td style={{...td,color:"#22c55e",fontWeight:700}}>
₹{(b.totalRent || 0)+(b.deposit || 0)}
</td>

<td style={td}>

<div style={{display:"flex",gap:8}}>

<button
style={primaryBtn}
onClick={()=>{
setSelectedBooking(b);
setShowDetailsModal(true);
}}
>
View
</button>

<button
style={secondaryBtn}
onClick={()=>navigate(`/vehicle/${b.vehicleId}`)}
>
Rebook
</button>

</div>

</td>

</tr>
))
)}

</tbody>

</table>

</div>
      {showDetailsModal && selectedBooking && (
  <BookingDetailsModal
    booking={selectedBooking}
    formatDate={formatDate}
    onClose={()=>{
      setShowDetailsModal(false);
      setSelectedBooking(null);
    }}
  />
)}
    </div>
  );
}

/* ---------- STYLES ---------- */

const statsRow = {
  display: "flex",
  gap: "16px",
  marginBottom: "30px",
  flexWrap: "wrap",
};

const statCard = {
  flex: "1",
  minWidth: "120px",
  padding: "18px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
};

const statValue = {
  fontSize: "20px",
  fontWeight: "800",
  color: "#ffffff",
};

const statLabel = {
  fontSize: "13px",
  color: "#94a3b8",
  marginTop: "4px",
};

const section = {
marginTop:"20px"
};

const sectionTitle = {
  marginBottom: "18px",
  fontWeight: "800",
  fontSize: "20px",
  color: "#ffffff",
};

const rowWrapper = {
  padding: "22px 0",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const name = {
  margin: 0,
  fontWeight: "700",
  fontSize: "17px",
  color: "#ffffff",
};

const price = {
  margin: "6px 0 0",
  color: "#94a3b8",
  fontSize: "13px",
};

const smartStatus = {
  marginTop: "8px",
  fontSize: "12px",
  fontWeight: "700",
  color: "#22c55e",
};

const dateText = {
  marginTop: "6px",
  fontSize: "13px",
  color: "#94a3b8",
};

const bottomRow = {
  marginTop: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const total = {
  fontWeight: "800",
  fontSize: "18px",
  color: "#16a34a",
};

const actions = {
  display: "flex",
  gap: "10px",
};

const primaryBtn = {
  padding: "8px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "700",
  fontSize: "13px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "8px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "transparent",
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "13px",
  cursor: "pointer",
};

const dangerBtn = {
  padding: "8px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(239,68,68,0.4)",
  background: "transparent",
  color: "#dc2626",
  fontWeight: "700",
  fontSize: "13px",
  cursor: "pointer",
};

const empty = {
  padding: "60px 20px",
  textAlign: "center",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
};
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalBox = {
  width: "90%",
  maxWidth: "500px",
  background: "#0f172a",
  padding: "30px",
  borderRadius: "20px",
  color: "#fff",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: 15,
  right: 15,
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "18px",
  cursor: "pointer",
};

const infoRow = {
  marginBottom: 14,
  padding: 10,
  borderRadius: 8,
  background: "rgba(255,255,255,0.05)",
};
const tabs={
display:"flex",
gap:"10px",
marginBottom:"25px"
};

const tabBtn={
padding:"10px 16px",
borderRadius:"12px",
border:"1px solid rgba(255,255,255,0.1)",
background:"rgba(255,255,255,0.05)",
color:"#fff",
cursor:"pointer",
fontWeight:600
};

const activeTab={
padding:"10px 16px",
borderRadius:"12px",
border:"none",
background:"linear-gradient(135deg,#3b82f6,#2563eb)",
color:"#fff",
cursor:"pointer",
fontWeight:700
};
const tableWrapper={
marginTop:"20px",
background:"rgba(255,255,255,0.04)",
border:"1px solid rgba(255,255,255,0.08)",
borderRadius:"14px",
overflow:"hidden"
}

const table={
width:"100%",
borderCollapse:"collapse"
}

const th={
textAlign:"left",
padding:"14px",
fontSize:"13px",
color:"#94a3b8",
borderBottom:"1px solid rgba(255,255,255,0.08)"
}

const td={
padding:"16px",
borderBottom:"1px solid rgba(255,255,255,0.05)",
fontSize:"14px"
}