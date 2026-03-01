import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ padding: 24 }}>
      <h1>🚲 RentApp</h1>
      <p>Affordable vehicle rentals for students</p>

      <div style={{ marginTop: 20 }}>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}
