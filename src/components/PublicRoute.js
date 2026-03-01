import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If already logged in → send to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

