import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useBookings } from "../components/context/BookingContext";
import { useAuth } from "../components/context/AuthContext";
import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import { useAuthUI } from "../components/context/AuthUIContext";
import { FaCheckCircle, FaTimes, FaCalendarAlt, FaHashtag } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import BookingDetailsModal from "../components/BookingDetailsModal";
import { getDoc } from "firebase/firestore";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdMyLocation } from "react-icons/md";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebase";
const punjabCities = [
"Amritsar",
"Ludhiana",
"Jalandhar",
"Patiala",
"Bathinda",
"Mohali",
"Chandigarh",
"Hoshiarpur",
"Pathankot",
"Firozpur",
"Batala",
"Moga",
"Khanna",
"Abohar",
"Muktsar",
"Barnala",
"Rajpura",
"Kapurthala",
"Faridkot",
"Malerkotla",
"Phagwara",
"Fatehgarh Sahib",
"Rupnagar",
"Samrala",
"Nabha",
"Sangrur",
"Tarn Taran"
];

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bookings, updateBooking } = useBookings();
  const { user } = useAuth();

  const booking = bookings.find(b => String(b.id) === String(id));
  const { openLogin } = useAuthUI();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [dropLocation, setDropLocation] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fireBookingId, setFireBookingId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const [confirmedData, setConfirmedData] = useState(null);

  /* SAFE DATE */
  const parseDate = (t) => {
    if (!t) return null;
    if (typeof t?.toDate === "function") return t.toDate();
    const d = new Date(t);
    return isNaN(d.getTime()) ? null : d;
  };

  const safeInputFormat = (t) => {
    const d = parseDate(t);
    return d ? d.toISOString().slice(0, 16) : "";
  };

  /* CALCULATE DAYS */
  useEffect(() => {
    if (!booking?.startTime || !booking?.endTime) return;

    const start = parseDate(booking.startTime);
    const end = parseDate(booking.endTime);
    if (!start || !end) return;

    const diff = end - start;
    if (diff <= 0) return;

    const days = Math.max(1, Math.ceil(diff / 86400000));
    const rent = days * booking.pricePerDay;

    if (
      booking.totalDays !== days ||
      booking.totalRent !== rent ||
      booking.status === "Draft"
    ) {
      updateBooking(booking.id, {
        totalDays: days,
        totalRent: rent,
        status: "Ready",
      });
    }
  }, [booking, updateBooking]);

  const price = useMemo(() => {
    if (!booking) return { total: 0, final: 0 };
    const total = (booking.totalRent || 0) + (booking.deposit || 0);
    return { total, final: Math.max(0, total - discount) };
  }, [booking, discount]);

  if (!booking) {
    return (
      <>
        <div className="container">
          <div style={notFound}>
            <h3>Booking not found</h3>
            <button style={primaryBtn} onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        </div>
      </>
    );
  }

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "STANFUT50") {
      setDiscount(50);
      toast.success("₹50 discount applied");
    } else if (code === "STANFUT100") {
      setDiscount(100);
      toast.success("₹100 discount applied");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon");
    }
  };

  const hasConflict = async () => {

  const q = query(
    collection(db, "bookings"),
    where("vehicleId", "==", booking.vehicleId),
    where("status", "in", ["Confirmed", "Paid"])
  );

  const snap = await getDocs(q);

  const newStart = parseDate(booking.startTime)?.getTime();
  const newEnd = parseDate(booking.endTime)?.getTime();

  if (!newStart || !newEnd) return false;

  for (let d of snap.docs) {

    if (d.id === booking.id) continue;

    const b = d.data();

    const oldStart = parseDate(b.startTime)?.getTime();
    const oldEnd = parseDate(b.endTime)?.getTime();

    if (!oldStart || !oldEnd) continue;

    if (newStart < oldEnd && newEnd > oldStart) {
      return true;
    }

  }

  return false;
};
const handlePayment = async () => {

  const options = {
    key: "rzp_live_SUAjQuLmVYc1Ng", // 🔥 PUT YOUR KEY HERE
    amount: price.final * 100,
    currency: "INR",
    name: "Stanfut",
    description: "Vehicle Booking",

    handler: async function (response) {
      console.log("Payment Success:", response);

      // 👉 after payment success
      await confirmBooking();
    },

    prefill: {
      email: user?.email
    },

    theme: {
      color: "#2563eb"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
  const confirmBooking = async () => {
    if (loading) return;

    try {
          const vehicleRef = doc(db, "vehicles", booking.vehicleId);
const vehicleSnap = await getDoc(vehicleRef);

const vehicleData = vehicleSnap.data();
const partnerId = vehicleData.ownerId;
const vehicleNumber = vehicleData.vehicleNumber || "";


      const start = parseDate(booking.startTime);
      const end = parseDate(booking.endTime);
      if (!start || !end) {
        toast.error("Please select valid booking dates");
        return;
      }

      if (!user) {
  toast.error("Please login to continue");
  openLogin();
  return;
}

      setLoading(true);

      const conflict = await hasConflict();

if (conflict) {
  toast.error("This vehicle is already booked for the selected time.");

  // mark booking locally as cancelled
  updateBooking(booking.id, {
    status: "Cancelled"
  });

  setLoading(false);
  navigate("/vehicles"); // redirect user back
  return;
}
const verificationCode = Math.floor(100000 + Math.random() * 900000);
/* ---- REVENUE CALCULATION ---- */

const commissionRate = 0.12;

const rent = booking.totalRent;
const deposit = booking.deposit || 0;

const adminRevenue = rent * commissionRate;
const partnerRevenue = rent - adminRevenue;

     await updateDoc(doc(db, "bookings", booking.id), {

verificationCode: verificationCode,
vehicleNumber: vehicleNumber || "Not Assigned",
partnerId: partnerId,
userLocation: userLocation,


startTime: Timestamp.fromDate(start),
endTime: Timestamp.fromDate(end),

totalDays: booking.totalDays,
totalRent: rent,

deposit: deposit,

adminRevenue: adminRevenue,
partnerRevenue: partnerRevenue,

refundAmount: deposit,

discount,
finalPayable: price.final,

dropLocation,

status: "Pending Partner Confirmation",

updatedAt: serverTimestamp(),

});

updateBooking(booking.id, { status: "Pending Partner Confirmation" });
/* ---------- PREPARE POPUP DATA ---------- */

setConfirmedData({
id: booking.id,
verificationCode: verificationCode,
vehicleName: booking.vehicleName,
vehicleNumber: vehicleData.vehicleNumber,

startTime: start,
endTime: end,

amount: price.final,
dropLocation: dropLocation,
time: new Date(),
});
setShowSuccessModal(true); // ✅ show popup

    } catch (err) {
      toast.error(err.message || "Booking failed");
    }

    setLoading(false);
  };
const getVehicleIcon = () => {
  const name = booking.vehicleName?.toLowerCase() || "";

  const bikeKeywords = [
    "bike",
    "motorcycle",
    "activa",
    "scooter",
    "dio",
    "royal enfield",
    "bullet",
    "r15",
    "duke",
    "pulsar"
  ];

  const isBike = bikeKeywords.some(word => name.includes(word));

  if (isBike) {
    return <FaMotorcycle size={26} style={{ marginRight: 10 }} />;
  }

  return <FaCarSide size={26} style={{ marginRight: 10 }} />;
};
  return (
    <>
      <div className="container">
        <div style={grid}>
          <div>
            <div style={vehicleCard}><h2
  style={{
    display: "flex",
    alignItems: "center",
    fontSize: 28,
    fontWeight: 800
  }}
>
  {getVehicleIcon()}
  {booking.vehicleName}
</h2>
              <p style={sub}>
                ₹{booking.pricePerDay}/day • Deposit ₹{booking.deposit}
              </p>

              <StatusBadge status={booking.status} />
              <hr />

              <label style={label}>Pickup Date/Time</label>
              <input
                type="datetime-local"
                value={safeInputFormat(booking.startTime)}
                onChange={(e) =>
                  updateBooking(booking.id, {
                    startTime: e.target.value,
                    status: "Draft",
                  })
                }
                style={inputStyle}
              />

              <label style={label}>Drop Date/Time</label>
              <input
                type="datetime-local"
                value={safeInputFormat(booking.endTime)}
                onChange={(e) =>
                  updateBooking(booking.id, {
                    endTime: e.target.value,
                    status: "Draft",
                  })
                }
                style={inputStyle}
              />
<label style={label}>Delivery Location</label>

<div style={locationBox}>

<HiOutlineLocationMarker size={20} style={{color:"#38bdf8"}}/>

<input
  value={dropLocation}
  onChange={(e)=>setDropLocation(e.target.value)}
  placeholder="Select Delivery Area"
  style={locationInput}
/>

<button
style={locationBtn}
onClick={()=>{

if(!navigator.geolocation){
alert("Location not supported");
return;
}

navigator.geolocation.getCurrentPosition((pos)=>{

const coords = {
lat: pos.coords.latitude,
lng: pos.coords.longitude
};

setUserLocation(coords);

  // 🔥 THIS LINE FIXES YOUR ISSUE
  const text = `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
  setDropLocation(text);

  toast.success("Location updated");

});

}}
>

<MdMyLocation size={18}/>
Use GPS

</button>

</div>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  style={inputStyle}
                />
                <button style={darkBtn} onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              {/* Instant Section */}
              <div style={instantCard}>
                <h4>Need instant booking?</h4>
                <a href="tel:+919877993425" style={callBtn}>
                  Call for Instant Booking
                  <div style={subText}>+91 9877993425</div>
                </a>
                <a
                  href="https://wa.me/919877993425"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={whatsappBtn}
                >
                  WhatsApp Inquiry
                  <div style={subText}>+91 9877993425</div>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div style={summaryCard}>
              <h3>Price Summary</h3>
              <Row label="Days" value={booking.totalDays || 0} />
              <Row label="Rent" value={`₹${booking.totalRent || 0}`} />
              <Row label="Deposit" value={`₹${booking.deposit}`} />
              <Row label="Discount" value={`− ₹${discount}`} />
              <hr />
              <Row label="Total Payable" value={`₹${price.final}`} bold />
<div style={payBox}>

    <div style={{fontSize:13,opacity:0.7}}>
      Secure booking • Instant confirmation
    </div>

    <div style={payAmount}>
      ₹{price.final}
    </div>

    {booking.status === "Ready" && (
      <button style={confirmBtn} onClick={handlePayment}>
  Pay & Book
</button>
    )}

    <div style={trustBox}>
      <div>✔ Verified Vehicles</div>
      <div>✔ Instant Booking</div>
      <div>✔ 24/7 Support</div>
    </div>

  </div>
            </div>
          </div>
        </div>
      </div>
  {showSuccessModal && confirmedData && (
  <BookingDetailsModal
    booking={confirmedData}
    formatDate={(d)=>d.toLocaleString()}
    onClose={()=>{
      setShowSuccessModal(false);
      navigate("/bookings");
    }}
  />
)}
    </>
    
  );
}

/* COMPONENTS */
function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontWeight: bold ? 800 : 500 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Draft: "#64748b",
    Ready: "#2563eb",
    Confirmed: "#f59e0b",
    Paid: "#16a34a",
  };
  return (
    <div style={{
      display: "inline-block",
      marginTop: 10,
      background: colors[status],
      color: "#fff",
      padding: "6px 12px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700
    }}>
      {status}
    </div>
  );
}

/* STYLES */
const grid = { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40, marginTop: 40 };
const vehicleCard = {
  padding: 30,
  borderRadius: 24,
  background: "rgba(15,23,42,0.75)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  color: "#fff"
};

const summaryCard = {
  padding: 30,
  borderRadius: 24,
  background: "rgba(15,23,42,0.75)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  color: "#fff"
};
const inputStyle = {
  width: "100%",
  padding: 14,
  marginTop: 6,
  marginBottom: 16,
  borderRadius: 14,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff"
};
const primaryBtn = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  boxShadow: "0 10px 25px rgba(59,130,246,0.4)",
  color: "#fff",
  fontWeight: 800,
  marginTop: 20,
  cursor: "pointer"
};const darkBtn = { padding: "14px 20px", borderRadius: 14, border: "none", background: "#0f172a", color: "#fff", fontWeight: 700 };
const label = { fontSize: 12, fontWeight: 600, color: "#64748b" };
const sub = { color: "#64748b" };
const notFound = { padding: 40, textAlign: "center" };

const instantCard = {
  marginTop: 30,
  padding: 20,
  borderRadius: 18,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: 12
};const callBtn = { padding: 14, borderRadius: 14, background: "#2563eb", color: "#fff", textDecoration: "none", fontWeight: 700 };
const whatsappBtn = { padding: 14, borderRadius: 14, background: "#16a34a", color: "#fff", textDecoration: "none", fontWeight: 700 };
const subText = { fontSize: 13, marginTop: 6 };

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.75)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalBox = {
  width: "90%",
  maxWidth: "600px",
  background: "linear-gradient(145deg,#0f172a,#020617)",
  borderRadius: "24px",
  padding: "40px 30px",
  color: "#fff",
  boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: 15,
  right: 15,
  background: "rgba(255,255,255,0.08)",
  border: "none",
  color: "#fff",
  padding: 8,
  borderRadius: "50%",
  cursor: "pointer",
};

const modalContentModern = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBottom: 30,
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: 15,
  background: "rgba(255,255,255,0.05)",
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
};

const infoIcon = {
  fontSize: 18,
  color: "#38bdf8",
};

const modalButtonsModern = {
  display: "flex",
  gap: 12,
};

const modernPrimaryBtn = {
  flex: 1,
  padding: 16,
  borderRadius: 16,
  border: "none",
  background: "linear-gradient(135deg,#3b82f6,#2563eb)",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const modernWhatsappBtn = {
  flex: 1,
  padding: 16,
  borderRadius: 16,
  border: "none",
  background: "#22c55e",
  color: "#fff",
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};
const locationBox={
display:"flex",
alignItems:"center",
gap:"10px",
background:"rgba(255,255,255,0.05)",
border:"1px solid rgba(255,255,255,0.1)",
borderRadius:"14px",
padding:"8px 10px",
marginBottom:"16px"
};

const locationInput={
flex:1,
background:"transparent",
border:"none",
color:"#fff",
fontSize:"14px",
outline:"none"
};

const locationBtn={
display:"flex",
alignItems:"center",
gap:"6px",
padding:"8px 12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(135deg,#22c55e,#10b981)",
color:"#fff",
fontWeight:"700",
cursor:"pointer"
};
const payBox={
marginTop:20,
padding:20,
borderRadius:16,
background:"linear-gradient(135deg,#1e293b,#020617)",
border:"1px solid rgba(255,255,255,0.08)",
textAlign:"center"
};

const payAmount={
fontSize:34,
fontWeight:900,
color:"#38bdf8",
margin:"10px 0"
};

const confirmBtn={
width:"100%",
padding:"16px",
borderRadius:"16px",
border:"none",
background:"linear-gradient(135deg,#3b82f6,#2563eb)",
boxShadow:"0 10px 30px rgba(59,130,246,0.5)",
color:"#fff",
fontWeight:800,
fontSize:"16px",
cursor:"pointer"
};

const trustBox={
display:"flex",
justifyContent:"space-between",
fontSize:"12px",
color:"#94a3b8",
marginTop:"12px"
};