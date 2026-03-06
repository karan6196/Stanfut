import HelpCenter from "./pages/HelpCenter";
import Support from "./pages/Support";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./components/context/AuthContext";
import { BookingProvider } from "./components/context/BookingContext";
import Privacy from "./pages/Privacy";
import FloatingSupport from "./components/layout/FloatingSupport";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Contacts from "./pages/Contact";
import Home from "./pages/Home";
import VehicleList from "./pages/VehicleList";
import VehicleDetail from "./pages/VehicleDetail";
import Checkout from "./pages/Checkout";
import Bookings from "./pages/Bookings";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import AIChatbot from "./components/AIChatbot";
import { AuthUIProvider } from "./components/context/AuthUIContext";
import AuthModal from "./components/auth/AuthModal";
function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* ---------- Protected Routes ---------- */}
      <Route path="/" element={<Home />} />

      <Route
        path="/vehicles"
        element={
          <ProtectedRoute isAuth={!!user}>
            <VehicleList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicle/:id"
        element={
          <ProtectedRoute isAuth={!!user}>
            <VehicleDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout/:id"
        element={
          <ProtectedRoute isAuth={!!user}>
            <Checkout />
          </ProtectedRoute>
        }
      />
<Route
  path="/contact"
  element={
    <ProtectedRoute isAuth={!!user}>
      <Contacts />
    </ProtectedRoute>
  }
/>
      <Route
        path="/bookings"
        element={
          <ProtectedRoute isAuth={!!user}>
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/help" element={<HelpCenter />} />
<Route path="/support" element={<Support />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuth={!!user}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes> 
  );
}


export default function App() {
return (
<AuthUIProvider>
<BookingProvider>

<Toaster position="top-center" />

<Header />

<AppRoutes />

<Footer />
<FloatingSupport />
<AIChatbot />
{/* GLOBAL POPUP */}
<AuthModal />

</BookingProvider>
</AuthUIProvider>
);
}
const main = {
  minHeight: "calc(100vh - 160px)",
};
