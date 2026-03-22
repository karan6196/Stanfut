import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

export default function AdminRoute({ children }) {

  const { user, loading } = useAuth();

  if (loading) return null;

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin allowed
  return children;
}