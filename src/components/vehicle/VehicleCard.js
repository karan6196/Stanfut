import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isFavorite, toggleFavorite } from "../../utils/storage";
import { Fuel, Star, MapPin, Car } from "lucide-react";
export default function VehicleCard({
  vehicle,
  bookingTime,
  isBooked = false,
}) {
  const navigate = useNavigate();

  const hasSelectedTime =
    bookingTime?.startTime && bookingTime?.endTime;

  const availability = getAvailability(vehicle.rating);

  const isDisabled = hasSelectedTime
    ? isBooked
    : availability.status === "Unavailable";

  const [fav, setFav] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setFav(isFavorite(vehicle.id));
  }, [vehicle.id]);

  const openDetail = () => {
    if (isDisabled) return;

    navigate(`/vehicle/${vehicle.id}`, {
      state: bookingTime || null,
    });
  };

  const onFavClick = (e) => {
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

  const image =
    vehicle.image ||
    vehicle.images?.[0] ||
    "https://via.placeholder.com/600x400.png?text=No+Image";

  return (
    <div
      style={{
        ...card,
        transform: hover ? "translateY(-6px)" : "translateY(0px)",
        boxShadow: hover
          ? "0 20px 40px rgba(0,0,0,0.15)"
          : "0 8px 24px rgba(0,0,0,0.08)",
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={openDetail}
    >
      {/* IMAGE */}
      <div style={imgWrap}>
        <img
          src={image}
          alt={vehicle.name}
          style={{
            ...img,
            transform: hover ? "scale(1.05)" : "scale(1)",
          }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/600x400.png?text=Vehicle";
          }}
        />

        {/* GRADIENT OVERLAY */}
        <div style={gradient} />

        {/* PRICE FLOAT */}
        <div style={priceFloat}>
          ₹{vehicle.pricePerDay}
          <span style={perDay}>/day</span>
        </div>

        {/* BADGES ROW */}
        <div style={badgeRow}>
          <span style={availability.style}>
            {hasSelectedTime
              ? isBooked
                ? "Booked"
                : "Available"
              : availability.status}
          </span>

          <div style={badgeRight}>
            {vehicle.verified && (
              <div style={verifiedBadge}>
                ✔ Verified
              </div>
            )}

            <button
              onClick={onFavClick}
              style={{
                ...favBtn,
                background: fav
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(0,0,0,0.45)",
                color: fav ? "#ef4444" : "#fff",
              }}
            >
              {fav ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={content}>
        <h3 style={title}>{vehicle.name}</h3>

        <div style={metaRow}>
  <Meta icon={<Fuel size={14} />} text={vehicle.fuel} />
  <Meta icon={<Star size={14} />} text={vehicle.rating} />
  <Meta icon={<MapPin size={14} />} text={vehicle.location} />
  <Meta icon={<Car size={14} />} text={vehicle.type} />
</div>

        <div style={bottomRow}>
          <div style={deposit}>
            Deposit ₹{vehicle.deposit}
          </div>

          <button
            disabled={isDisabled}
            style={{
              ...cta,
              background: isDisabled
                ? "#cbd5e1"
                : "linear-gradient(135deg,#2563eb,#06b6d4)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              openDetail();
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}

/* META ITEM */
function Meta({ icon, text }) {
  return (
    <div style={meta}>
      <span style={{ display: "flex", alignItems: "center" }}>
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

/* AVAILABILITY */
function getAvailability(rating = 0) {
  if (rating >= 4.6)
    return {
      status: "Available",
      style: pill("#16a34a"),
    };

  if (rating >= 4.3)
    return {
      status: "Few Left",
      style: pill("#f59e0b"),
    };

  return {
    status: "Unavailable",
    style: pill("#dc2626"),
  };
}

function pill(color) {
  return {
    background: color,
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
  };
}

/* STYLES */

const card = {
  borderRadius: "20px",
  overflow: "hidden",
  background: "#1e293b",
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "all 0.25s ease",
};
const imgWrap = {
  position: "relative",
  height: "200px",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.4s",
};

const gradient = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
};

const priceFloat = {
  position: "absolute",
  bottom: "12px",
  left: "12px",
  background: "rgba(15,23,42,0.9)",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "10px",
  fontWeight: 800,
  fontSize: "16px",
};

const perDay = {
  fontSize: "12px",
  marginLeft: "4px",
  color: "#64748b",
};

const badgeRow = {
  position: "absolute",
  top: "12px",
  left: "12px",
  right: "12px",
  display: "flex",
  justifyContent: "space-between",
};

const badgeRight = {
  display: "flex",
  gap: "8px",
};

const verifiedBadge = {
  background: "#2563eb",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "999px",
  fontSize: "12px",
};

const favBtn = {
  border: "none",
  borderRadius: "50%",
  width: "34px",
  height: "34px",
  cursor: "pointer",
};

const content = {
  padding: "16px",
};

const title = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 800,
};

const metaRow = {
  marginTop: "10px",
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const meta = {
  background: "rgba(255,255,255,0.06)",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  color: "#e2e8f0",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const bottomRow = {
  marginTop: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const deposit = {
  fontSize: "13px",
  color: "#94a3b8",
};

const cta = {
  border: "none",
  padding: "9px 14px",
  borderRadius: "10px",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};
