import { FaTimes, FaCalendarAlt, FaHashtag } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";

export default function BookingDetailsModal({
  booking,
  onClose,
  formatDate
}) {
  if (!booking) return null;

  return (
    <div style={overlay}>
      <div style={modal}>

        <button style={closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <h2 style={title}>Booking Details</h2>
        {/* VEHICLE IMAGE */}
{booking.vehicleImage && (
  <div style={vehicleImageBox}>
    <img
      src={booking.vehicleImage}
      alt="vehicle"
      style={vehicleImage}
    />
  </div>
)}

        {/* BOOKING */}
        <div style={section}>
          <div style={row}>
            <FaHashtag />
            <div>
              <small>Booking ID</small>
<div style={copyRow}>
  <span>{booking.id}</span>

  <button
    style={copyBtn}
    onClick={()=>{
      navigator.clipboard.writeText(booking.id);
    }}
  >
    Copy
  </button>
</div>            </div>
          </div>

          <div style={row}>
            <FaHashtag />
            <div>
              <small>Verification Code</small>
              <div style={code}>
                {booking.verificationCode}
              </div>
            </div>
          </div>
        </div>

        {/* VEHICLE */}
        <div style={section}>
          <div style={row}>
            <IoCarSportSharp />
            <div>
              <small>Vehicle</small>
              <div>{booking.vehicleName}</div>
            </div>
          </div>
        </div>

        {/* TRIP */}
        <div style={section}>
          <div style={row}>
            <FaCalendarAlt />
            <div>
              <small>Start</small>
              <div>{formatDate(booking.startTime)}</div>
            </div>
          </div>

          <div style={row}>
            <FaCalendarAlt />
            <div>
              <small>End</small>
              <div>{formatDate(booking.endTime)}</div>
            </div>
          </div>
        </div>

        {/* PAYMENT */}
        <div style={section}>
          <div style={row}>
            <small>Total Paid</small>
            <div style={amount}>
              ₹{(booking.totalRent || 0) + (booking.deposit || 0)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const modal = {
  width: "90%",
  maxWidth: "520px",
  background: "#0f172a",
  borderRadius: "20px",
  padding: "30px",
  color: "#fff",
  position: "relative"
};

const closeBtn = {
  position: "absolute",
  top: 15,
  right: 15,
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer"
};

const title = {
  marginBottom: 20,
  fontWeight: 800
};

const section = {
  marginBottom: 18,
  padding: 14,
  background: "rgba(255,255,255,0.04)",
  borderRadius: 12
};

const row = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  marginBottom: 10
};

const code = {
  fontSize: 18,
  fontWeight: 800,
  letterSpacing: 3,
  color: "#22c55e"
};

const amount = {
  fontWeight: 800,
  fontSize: 18,
  color: "#22c55e"
};
const vehicleImageBox = {
  marginBottom: 20,
  borderRadius: 12,
  overflow: "hidden"
};

const vehicleImage = {
  width: "100%",
  height: 180,
  objectFit: "cover"
};

const copyRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const copyBtn = {
  border: "none",
  background: "#2563eb",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 12
};