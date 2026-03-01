import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";

const BookingContext = createContext();

export function BookingProvider({ children }) {

  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  /* =====================================================
     REALTIME FETCH USER BOOKINGS (Firestore Source)
  ===================================================== */

  useEffect(() => {

    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {

        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBookings(list);
        setLoading(false);

      },
      (error) => {
        console.error("Booking fetch error:", error);
        setLoading(false);
      }
    );

    return unsubscribe;

  }, [user]);


  /* =====================================================
     CREATE BOOKING (Draft)
  ===================================================== */

  const addBooking = async (vehicle) => {

    if (!user) throw new Error("User not logged in");

    const docRef = await addDoc(collection(db, "bookings"), {

      userId: user.uid,

      vehicleId: String(vehicle.id),
      vehicleName: vehicle.name,

      pricePerDay: Number(vehicle.pricePerDay) || 0,
      deposit: Number(vehicle.deposit) || 0,

      startTime: "",
      endTime: "",

      totalDays: 0,
      totalRent: 0,

      discount: 0,
      finalPayable: 0,

      status: "Draft",

      createdAt: serverTimestamp()

    });

    return docRef.id;

  };


  /* =====================================================
     UPDATE BOOKING
  ===================================================== */

  const updateBooking = async (bookingId, updates) => {

    try {

      await updateDoc(
        doc(db, "bookings", String(bookingId)),
        updates
      );

    }
    catch (error) {

      console.error("Update booking failed:", error);

    }

  };


  /* =====================================================
     DELETE BOOKING
  ===================================================== */

  const removeBooking = async (bookingId) => {

    try {

      await deleteDoc(
        doc(db, "bookings", String(bookingId))
      );

    }
    catch (error) {

      console.error("Delete booking failed:", error);

    }

  };


  /* =====================================================
     CLEAR LOCAL STATE
  ===================================================== */

  const clearBookings = () => {

    setBookings([]);

  };


  return (

    <BookingContext.Provider
      value={{
        bookings,
        loading,
        addBooking,
        updateBooking,
        removeBooking,
        clearBookings
      }}
    >

      {children}

    </BookingContext.Provider>

  );

}


export function useBookings() {

  return useContext(BookingContext);

}
