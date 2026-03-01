import { useEffect, useState, useRef } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useBookings } from "../components/context/BookingContext";
import toast from "react-hot-toast";
import { db, storage } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const { user, logout } = useAuth();
  const { bookings } = useBookings();
  const fileRef = useRef();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || user.email.split("@")[0]);
        setAvatar(data.avatar || "");
        if (data.createdAt?.toDate) {
          setMemberSince(data.createdAt.toDate().getFullYear());
        }
      } else {
        await setDoc(doc(db, "users", user.uid), {
          name: user.email.split("@")[0],
          email: user.email,
          createdAt: serverTimestamp()
        });
        setName(user.email.split("@")[0]);
      }
    };

    fetchProfile();
  }, [user]);

  const uploadAvatar = async (file) => {
    if (!file || !user) return;
    try {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setAvatar(url);

      await setDoc(
        doc(db, "users", user.uid),
        { avatar: url, updatedAt: serverTimestamp() },
        { merge: true }
      );

      toast.success("Profile updated");
    } catch {
      toast.error("Upload failed");
    }
  };

  if (!user) return null;

  /* ================= RENTAL STATS ================= */

  const totalRentals = bookings?.length || 0;
  const completed = bookings?.filter(b => b.status === "Paid").length || 0;

  const vehicleCounts = {};
  bookings?.forEach(b => {
    vehicleCounts[b.vehicleName] =
      (vehicleCounts[b.vehicleName] || 0) + 1;
  });

  const popularVehicle =
    Object.keys(vehicleCounts).length > 0
      ? Object.keys(vehicleCounts).reduce((a, b) =>
          vehicleCounts[a] > vehicleCounts[b] ? a : b
        )
      : "N/A";

  /* ================= UI ================= */

  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <div style={avatarWrapper}>
          <img
            src={avatar || `https://ui-avatars.com/api/?name=${name}`}
            alt="avatar"
            style={avatarStyle}
          />
          <div style={editAvatar} onClick={() => fileRef.current.click()}>
            ✎
          </div>
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => uploadAvatar(e.target.files[0])}
          />
        </div>

        <h2 style={nameText}>{name}</h2>
        <p style={emailText}>{user.email}</p>
        {memberSince && (
          <p style={memberText}>Member since {memberSince}</p>
        )}
      </div>

      {/* TABS */}
      <div style={tabs}>
        {["overview", "history", "settings"].map(tab => (
          <div
            key={tab}
            style={{
              ...tabButton,
              ...(activeTab === tab ? activeTabStyle : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview" && "Overview"}
            {tab === "history" && "Rental History"}
            {tab === "settings" && "Settings"}
          </div>
        ))}
      </div>

      <div>
        {activeTab === "overview" && (
          <div style={statsGrid}>
            <StatCard type="rentals" label="Total Rentals" value={totalRentals} />
            <StatCard type="completed" label="Completed" value={completed} />
            <StatCard type="popular" label="Popular Vehicle" value={popularVehicle} />
            <StatCard type="rating" label="Rating" value="4.9 ★" />
          </div>
        )}

        {activeTab === "history" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {bookings?.length === 0 && (
              <div style={empty}>No rental history yet</div>
            )}

            {bookings?.map((ride, i) => (
              <div key={i} style={rideCard}>
                <div style={rideTop}>
                  <div style={rideVehicle}>
                    {ride.vehicleName || "Vehicle"}
                  </div>

                  <div
                    style={{
                      ...statusBadge,
                      background:
                        ride.status === "Paid"
                          ? "#22c55e"
                          : ride.status === "Confirmed"
                          ? "#3b82f6"
                          : "#f59e0b"
                    }}
                  >
                    {ride.status}
                  </div>
                </div>

                <Detail label="Booking ID" value={ride.id || "—"} />
                <Detail label="Pickup" value={ride.pickupLocation || "—"} />
                <Detail label="Drop" value={ride.dropLocation || "—"} />
                <Detail label="Start Date" value={ride.startDate || "—"} />
                <Detail label="End Date" value={ride.endDate || "—"} />
                <Detail label="Price" value={`₹${ride.price || 0}`} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div style={card}>
            <Row label="Email Verified" value={user.emailVerified ? "Yes" : "No"} />
            <Row label="Logout" value="Sign out" danger onClick={logout} />
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={bottomNav}>
        <div style={navItem}>Home</div>
        <div style={navItem}>Book</div>
        <div style={{ ...navItem, color: "#14b8a6" }}>Profile</div>
        <div style={navItem}>More</div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ type, label, value }) {
  const iconColor = "#14b8a6";

  return (
    <div style={statCard}>
      <div style={{ marginBottom: 10 }}>
        <svg width="24" height="24" fill="none" stroke={iconColor} strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <div style={statValue}>{value}</div>
      <div style={statLabel}>{label}</div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div style={detailRow}>
      <span style={detailLabel}>{label}</span>
      <span style={detailValue}>{value}</span>
    </div>
  );
}

function Row({ label, value, danger, onClick }) {
  return (
    <div
      style={{
        ...row,
        color: danger ? "#ef4444" : "#e5e7eb"
      }}
      onClick={onClick}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  background: "#0f172a",
  minHeight: "100vh",
  padding: "30px 18px 100px",
  color: "#fff",
  fontFamily: "system-ui"
};

const header = { textAlign: "center", marginBottom: 30 };

const avatarWrapper = {
  position: "relative",
  width: 100,
  height: 100,
  margin: "0 auto 14px"
};

const avatarStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #1e293b"
};

const editAvatar = {
  position: "absolute",
  bottom: 0,
  right: 0,
  background: "#14b8a6",
  padding: "6px 8px",
  borderRadius: "50%",
  cursor: "pointer"
};

const nameText = { fontSize: 22, fontWeight: 700 };
const emailText = { fontSize: 13, opacity: 0.6 };
const memberText = { fontSize: 12, opacity: 0.5 };

const tabs = {
  display: "flex",
  gap: 10,
  marginBottom: 20
};

const tabButton = {
  padding: "8px 16px",
  borderRadius: 999,
  border: "1px solid #1e293b",
  cursor: "pointer",
  fontSize: 13
};

const activeTabStyle = {
  background: "#14b8a6",
  color: "#fff"
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14
};

const statCard = {
  background: "#111827",
  borderRadius: 18,
  padding: 18,
  textAlign: "center"
};

const statValue = { fontSize: 18, fontWeight: 700 };
const statLabel = { fontSize: 12, opacity: 0.6 };

const rideCard = {
  background: "#111827",
  borderRadius: 18,
  padding: 18
};

const rideTop = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 12
};

const rideVehicle = {
  fontSize: 16,
  fontWeight: 600
};

const statusBadge = {
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  color: "#fff"
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 6,
  fontSize: 13
};

const detailLabel = { opacity: 0.6 };
const detailValue = { fontWeight: 500 };

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 0",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  cursor: "pointer"
};

const card = {
  background: "#111827",
  borderRadius: 18,
  padding: 18
};

const empty = { padding: 16, opacity: 0.6 };

const bottomNav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#111827",
  display: "flex",
  justifyContent: "space-around",
  padding: 14
};

const navItem = {
  fontSize: 14,
  opacity: 0.7,
  cursor: "pointer"
};