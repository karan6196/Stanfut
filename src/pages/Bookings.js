import { useNavigate } from "react-router-dom";
import { useBookings } from "../components/context/BookingContext";

export default function Bookings() {
  const navigate = useNavigate();
  const { bookings, loading, removeBooking } = useBookings();

  /* ---------- SPLIT BOOKINGS ---------- */

  const active = bookings.filter(
    (b) =>
      b.status === "Draft" ||
      b.status === "Ready" ||
      b.status === "Confirmed"
  );

  const completed = bookings.filter((b) => b.status === "Paid");

  /* ---------- TOTAL SPENT ---------- */

  const totalSpent = completed.reduce(
    (sum, b) => sum + (b.totalRent + b.deposit),
    0
  );

  /* ---------- FORMAT DATE ---------- */

  function formatDate(t) {
    if (!t) return "Not set";
    try {
      const d =
        typeof t?.toDate === "function" ? t.toDate() : new Date(t);

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
    const start = new Date(b.startTime);
    const end = new Date(b.endTime);

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
      Confirmed: { color: "#2563eb", bg: "rgba(37,99,235,0.12)" },
      Paid: { color: "#16a34a", bg: "rgba(22,163,74,0.12)" },
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
            ₹{b.totalRent + b.deposit}
          </div>

          <div style={actions}>
            <button
              style={primaryBtn}
              onClick={() => navigate(`/checkout/${b.id}`)}
            >
              View
            </button>

            {b.status === "Paid" && (
              <button
                style={secondaryBtn}
                onClick={() =>
                  navigate(`/vehicle/${b.vehicleId}`)
                }
              >
                Rebook
              </button>
            )}

            <button
              style={dangerBtn}
              onClick={() => removeBooking(b.id)}
            >
              Cancel
            </button>
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

      {/* STATS SECTION */}
      <div style={statsRow}>
        <div style={statCard}>
          <div style={statValue}>{bookings.length}</div>
          <div style={statLabel}>Total Trips</div>
        </div>

        <div style={statCard}>
          <div style={statValue}>{active.length}</div>
          <div style={statLabel}>Active</div>
        </div>

        <div style={statCard}>
          <div style={statValue}>₹{totalSpent}</div>
          <div style={statLabel}>Total Spent</div>
        </div>
      </div>

      {/* ACTIVE */}
      <div style={section}>
        <h2 style={sectionTitle}>Active Bookings</h2>

        {active.length === 0
          ? <Empty />
          : active.map((b) => (
              <BookingRow key={b.id} b={b} />
            ))}
      </div>

      {/* COMPLETED */}
      <div style={section}>
        <h2 style={sectionTitle}>Completed</h2>

        {completed.length === 0
          ? <Empty />
          : completed.map((b) => (
              <BookingRow key={b.id} b={b} />
            ))}
      </div>
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
  marginBottom: "40px",
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