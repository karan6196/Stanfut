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

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { bookings, updateBooking } = useBookings();
  const { user } = useAuth();

  const booking = bookings.find(b => String(b.id) === String(id));
  const { openLogin } = useAuthUI();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
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
      const b = d.data();
      const oldStart = parseDate(b.startTime)?.getTime();
const oldEnd = parseDate(b.endTime)?.getTime();
      if (newStart < oldEnd && newEnd > oldStart) return true;
    }
    return false;
  };

  const confirmBooking = async () => {
    try {
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
        toast.error("Vehicle already booked ❌");
        setLoading(false);
        return;
      }

      await updateDoc(doc(db, "bookings", booking.id), {
      startTime: Timestamp.fromDate(start),
    endTime: Timestamp.fromDate(end),
    totalDays: booking.totalDays,
    totalRent: booking.totalRent,
    discount,
    finalPayable: price.final,
    status: "Confirmed",
    updatedAt: serverTimestamp(),
  });

  updateBooking(booking.id, { status: "Confirmed" });

/* ---------- PREPARE POPUP DATA ---------- */

setConfirmedData({
id: booking.id,
vehicleName: booking.vehicleName,
start: start,
end: end,
amount: price.final,
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

              <label style={label}>Start Date</label>
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

              <label style={label}>End Date</label>
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

              {booking.status === "Ready" && (
                <button style={primaryBtn} onClick={confirmBooking}>
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
  {showSuccessModal && confirmedData && (
  <div style={modalOverlay}>
    <div style={modalBox}>

      {/* CLOSE BUTTON */}
      <button
        style={closeBtn}
        onClick={() => {
          setShowSuccessModal(false);
          navigate("/");
        }}
      >
        <FaTimes />
      </button>

      {/* SUCCESS ICON */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <FaCheckCircle size={70} color="#22c55e" />
        <h2 style={{ marginTop: 15, fontWeight: 800 }}>
          Booking Confirmed
        </h2>
      </div>

      <div style={modalContentModern}>

        <div style={infoRow}>
          <FaHashtag style={infoIcon} />
          <div>
            <small>Booking ID</small>
            <div>{confirmedData.id}</div>
          </div>
        </div>

        <div style={infoRow}>
          <IoCarSportSharp style={infoIcon} />
          <div>
            <small>Vehicle</small>
            <div>{confirmedData.vehicleName}</div>
          </div>
        </div>

        <div style={infoRow}>
          <FaCalendarAlt style={infoIcon} />
          <div>
            <small>Start</small>
            <div>{confirmedData.start.toLocaleString()}</div>
          </div>
        </div>

        <div style={infoRow}>
          <FaCalendarAlt style={infoIcon} />
          <div>
            <small>End</small>
            <div>{confirmedData.end.toLocaleString()}</div>
          </div>
        </div>

        <div style={infoRow}>
          <FaCalendarAlt style={infoIcon} />
          <div>
            <small>Confirmed At</small>
            <div>{confirmedData.time.toLocaleString()}</div>
          </div>
        </div>

        <div style={infoRow}>
          <FaHashtag style={infoIcon} />
          <div>
            <small>Amount Paid</small>
            <div>₹{confirmedData.amount}</div>
          </div>
        </div>

      </div>

      <div style={modalButtonsModern}>

        <button
          style={modernPrimaryBtn}
          onClick={() => navigate("/bookings")}
        >
          View My Bookings
        </button>

        <button
          style={modernWhatsappBtn}
          onClick={() => {
            const msg =
`✅ STANFUT Booking Confirmed

Booking ID: ${confirmedData.id}
Vehicle: ${confirmedData.vehicleName}
Start: ${confirmedData.start.toLocaleString()}
End: ${confirmedData.end.toLocaleString()}
Amount: ₹${confirmedData.amount}`;

            window.open(
              "https://wa.me/?text=" + encodeURIComponent(msg),
              "_blank"
            );
          }}
        >
          <BsWhatsapp style={{ marginRight: 8 }} />
          Share
        </button>

      </div>

    </div>
  </div>
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