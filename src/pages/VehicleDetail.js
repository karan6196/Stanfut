import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useBookings } from "../components/context/BookingContext";
import toast from "react-hot-toast";

import { addRecentlyViewed } from "../utils/storage";

import {
doc,
getDoc,
collection,
getDocs,
query,
where
} from "firebase/firestore";

import { db } from "../firebase";

export default function VehicleDetail() {

const { id } = useParams();
const navigate = useNavigate();
const location = useLocation();

const { addBooking, updateBooking } = useBookings();

const [vehicle, setVehicle] = useState(null);
const [loading, setLoading] = useState(true);

const [activeImg, setActiveImg] = useState("");

const [checking, setChecking] = useState(false);
const [isBooked, setIsBooked] = useState(false);

//////////////////////////////////////////////////////
// FETCH VEHICLE
//////////////////////////////////////////////////////

useEffect(() => {

const fetchVehicle = async () => {

try {

setLoading(true);

const ref = doc(db, "vehicles", id);
const snap = await getDoc(ref);

if (!snap.exists()) {

setVehicle(null);
return;

}

const data = {
id: snap.id,
...snap.data()
};

setVehicle(data);

addRecentlyViewed(data.id);

/////////////////////////////
// FIX IMAGE SUPPORT
/////////////////////////////

let gallery = [];

if (Array.isArray(data.images) && data.images.length > 0)
gallery = data.images;

else if (data.image)
gallery = [data.image];

setActiveImg(gallery[0] || "");

}
catch(err){

console.log(err);
setVehicle(null);

}
finally{

setLoading(false);

}

};

fetchVehicle();

}, [id]);

//////////////////////////////////////////////////////
// TIME HELPER
//////////////////////////////////////////////////////

const timeToMillis = (t) => {

if (!t) return 0;

if (typeof t.toDate === "function")
return t.toDate().getTime();

return new Date(t).getTime();

};

//////////////////////////////////////////////////////
// CHECK AVAILABILITY
//////////////////////////////////////////////////////

useEffect(() => {

const check = async () => {

if (!vehicle) return;

if (!location.state?.startTime || !location.state?.endTime)
return;

setChecking(true);

const start = new Date(location.state.startTime).getTime();
const end = new Date(location.state.endTime).getTime();

const q = query(
collection(db,"bookings"),
where("vehicleId","==",vehicle.id),
where("status","in",["Confirmed","Paid"])
);

const snap = await getDocs(q);

let booked = false;

snap.forEach(d=>{

const b = d.data();

const oldStart = timeToMillis(b.startTime);
const oldEnd = timeToMillis(b.endTime);

if(start < oldEnd && end > oldStart)
booked = true;

});

setIsBooked(booked);

setChecking(false);

};

check();

},[vehicle,location.state]);

//////////////////////////////////////////////////////
// BOOK NOW
//////////////////////////////////////////////////////

const handleBookNow = async () => {

try{

if(checking) return;

if(isBooked){

toast.error("Already booked");
return;

}

const bookingId = await addBooking(vehicle);

if(location.state?.startTime){

await updateBooking(bookingId,{
startTime: location.state.startTime,
endTime: location.state.endTime,
status:"Ready"
});

}

toast.success("Booking created");

navigate(`/checkout/${bookingId}`);

}
catch(err){

toast.error(err.message);

}

};

//////////////////////////////////////////////////////
// LOADING
//////////////////////////////////////////////////////

if(loading)
return(
<>
<div className="container">
<div className="card">Loading vehicle...</div>
</div>
</>
);

//////////////////////////////////////////////////////
// NOT FOUND
//////////////////////////////////////////////////////

if(!vehicle)
return(
<>
<div className="container">
<div className="card">Vehicle not found</div>
</div>
</>
);

//////////////////////////////////////////////////////
// IMAGES
//////////////////////////////////////////////////////

let gallery = [];

if(Array.isArray(vehicle.images))
gallery = vehicle.images;

else if(vehicle.image)
gallery = [vehicle.image];

//////////////////////////////////////////////////////
// UI
//////////////////////////////////////////////////////

return (
  <>
<div
  className="container"
  style={{
    padding: "30px 0",
    minHeight: "100vh"
  }}
>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "40px",
        }}
      >

        {/* LEFT SECTION */}
        <div>

          {/* Main Image */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={activeImg}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
              }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x500")
              }
            />
          </div>

          {/* Thumbnail Gallery */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "15px",
            }}
          >
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                style={{
                  width: "100px",
                  height: "75px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border:
                    activeImg === img
                      ? "3px solid #2563eb"
                      : "2px solid #eee",
                }}
                onClick={() => setActiveImg(img)}
              />
            ))}
          </div>

          {/* Vehicle Info */}
          <div style={{ marginTop: "30px" }}><h1
  style={{
    fontSize: "36px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.5px"
  }}
>
              {vehicle.name}
            </h1>
<p style={{ color: "#94a3b8", marginTop: "8px" }}>
              {vehicle.location || "Available near you"}
            </p>

            {/* Specs Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginTop: "25px",
              }}
            >
              <div className="card">
                <strong>Fuel</strong>
                <p>{vehicle.fuelType || "Petrol"}</p>
              </div>

              <div className="card">
                <strong>Transmission</strong>
                <p>{vehicle.transmission || "Manual"}</p>
              </div>

              <div className="card">
                <strong>Seats</strong>
                <p>{vehicle.seats || "5"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT BOOKING PANEL */}
        <div>
          <div
  style={{
    position: "sticky",
    top: "100px",
    borderRadius: "20px",
    padding: "25px",
    background: "rgba(15,23,42,0.75)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
    color: "#fff"
  }}
>
            <h2 style={{ fontSize: "28px", marginBottom: "5px" }}>
              ₹{vehicle.pricePerDay}
              <span style={{ fontSize: "14px", color: "#64748b" }}>
                /day
              </span>
            </h2>

            <p style={{ color: "#64748b", marginBottom: "15px" }}>
              Deposit ₹{vehicle.deposit || 2000}
            </p>

            {location.state?.startTime && (
              <div
                style={{
                  background: "#f1f5f9",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              >
                <small>
                  {new Date(
                    location.state.startTime
                  ).toLocaleString()}
                  {" - "}
                  {new Date(
                    location.state.endTime
                  ).toLocaleString()}
                </small>
              </div>
            )}

            <button
              onClick={handleBookNow}
              disabled={checking || isBooked}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                fontWeight: "600",
                fontSize: "16px",
                background: isBooked
                  ? "#94a3b8"
                  : "linear-gradient(135deg,#2563eb,#1e40af)",
                color: "white",
                cursor: "pointer",
              }}
            >
              {isBooked ? "Already Booked" : "Book Now"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </>
);

}
