import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isFavorite, toggleFavorite } from "../../utils/storage";

export default function VehicleCard({
  vehicle,
  bookingTime,
  isBooked = false,
}) {

  const navigate = useNavigate();

  const hasTime =
    bookingTime?.startTime && bookingTime?.endTime;

  const availability = getAvailability(vehicle.rating);

  const disabled =
    hasTime ? isBooked : availability.status === "Unavailable";

  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(vehicle.id));
  }, [vehicle.id]);

  const open = () => {
    if (disabled) return;

    navigate(`/vehicle/${vehicle.id}`, {
      state: bookingTime || null,
    });
  };

  const toggleFav = (e) => {
    e.stopPropagation();

    const updated = toggleFavorite(vehicle.id);

    const nowFav = updated.includes(vehicle.id);

    setFav(nowFav);

    toast.success(
      nowFav
        ? "Added to Favorites ❤️"
        : "Removed from Favorites"
    );
  };

  return (
    <div
      style={{
        ...card,
        opacity: disabled ? 0.55 : 1,
      }}
      onClick={open}
    >

      {/* IMAGE */}
      <div style={imgWrap}>

        <img
          src={vehicle.image}
          alt={vehicle.name}
          style={img}
          onError={(e)=>{
            e.target.src =
            "https://via.placeholder.com/600x400?text=Vehicle";
          }}
        />

        <div style={gradient}/>

        {/* AVAILABILITY */}
        <div style={badgeLeft}>
          {hasTime ? (
            isBooked
              ? <span style={badgeRed}>Booked</span>
              : <span style={badgeGreen}>Available</span>
          ) : (
            <span style={availability.style}>
              {availability.status}
            </span>
          )}
        </div>

        {/* FAVORITE */}
        <button
          style={favBtn}
          onClick={toggleFav}
        >
          {fav ? "❤️" : "🤍"}
        </button>

      </div>

      {/* CONTENT */}
      <div style={content}>

        <h3 style={title}>
          {vehicle.name}
        </h3>

        {/* PRICE */}
        <div style={priceRow}>

          <div>
            <div style={price}>
              ₹{vehicle.pricePerDay}
            </div>
            <div style={perDay}>
              per day
            </div>
          </div>

          <div style={deposit}>
            ₹{vehicle.deposit} deposit
          </div>

        </div>

        {/* META */}
        <div style={metaRow}>
          <Meta icon="⛽" text={vehicle.fuel}/>
          <Meta icon="⭐" text={vehicle.rating}/>
          <Meta icon="📍" text={vehicle.location}/>
        </div>

        {/* BUTTON */}
        <button
          disabled={disabled}
          style={{
            ...btn,
            background: disabled
              ? "#cbd5e1"
              : "linear-gradient(135deg,#2563eb,#06b6d4)"
          }}
        >
          View Details →
        </button>

      </div>

    </div>
  );
}

/* META */
function Meta({icon,text}) {
  return (
    <div style={meta}>
      {icon} {text}
    </div>
  );
}

/* AVAILABILITY */
function getAvailability(rating){

  if(rating >= 4.6)
    return {
      status:"Available",
      style:badgeGreen
    };

  if(rating >= 4.3)
    return {
      status:"Few Left",
      style:badgeOrange
    };

  return {
    status:"Unavailable",
    style:badgeRed
  };
}

/* STYLES */

const card = {
  background: "linear-gradient(145deg, #1e293b, #0f172a)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "20px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
};

const imgWrap = {
  position: "relative",
  height: "200px",
  background: "#1e293b"
};

const img = {

  width:"100%",
  height:"100%",
  objectFit:"cover",

};

const gradient = {

  position:"absolute",
  inset:0,

  background:
  "linear-gradient(to top,rgba(0,0,0,0.5),transparent)"

};

const badgeLeft = {

  position:"absolute",
  top:"12px",
  left:"12px",

};

const favBtn = {

  position:"absolute",
  top:"12px",
  right:"12px",

  border:"none",

  background:
  "rgba(0,0,0,0.45)",

  color:"#fff",

  borderRadius:"50%",

  width:"36px",
  height:"36px",

  fontSize:"16px",

  cursor:"pointer"

};

const content = {

  padding:"16px"

};

const title = {
  margin:0,
  fontSize:"18px",
  fontWeight:"800",
  color:"#f1f5f9"
};

const priceRow = {

  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",

  marginTop:"10px"

};

const price = {

  fontSize:"22px",
  fontWeight:"900",

  color:"#2563eb"

};

const perDay = {
  fontSize:"12px",
  color:"#94a3b8"
};

const deposit = {
  fontSize:"13px",
  background:"rgba(37,99,235,0.15)",
  color:"#93c5fd",
  padding:"6px 10px",
  borderRadius:"10px"
};

const metaRow = {

  marginTop:"12px",

  display:"flex",
  gap:"8px",
  flexWrap:"wrap"

};

const meta = {
  background:"rgba(255,255,255,0.06)",
  color:"#cbd5e1",
  padding:"6px 10px",
  borderRadius:"8px",
  fontSize:"13px"
};

const btn = {

  width:"100%",
  marginTop:"14px",

  padding:"12px",

  border:"none",

  borderRadius:"12px",

  color:"#fff",

  fontWeight:"700",

  cursor:"pointer"

};

const badgeGreen={
background:"#16a34a",
color:"#fff",
padding:"6px 12px",
borderRadius:"999px",
fontWeight:"700",
fontSize:"12px"
};

const badgeOrange={
background:"#f59e0b",
color:"#fff",
padding:"6px 12px",
borderRadius:"999px",
fontWeight:"700",
fontSize:"12px"
};

const badgeRed={
background:"#dc2626",
color:"#fff",
padding:"6px 12px",
borderRadius:"999px",
fontWeight:"700",
fontSize:"12px"
};
