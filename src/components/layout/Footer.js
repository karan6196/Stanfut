import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  return (
    <footer style={wrap}>
      <div style={container}>
        <div style={grid}>
          
          {/* Brand */}
          <div>
            <div style={brand}>STANFUT</div>
            <p style={text}>
              Premium vehicle rentals built for speed, safety and seamless booking.
            </p>

            {/* Download App Section */}
            <div style={appSection}>
              <div style={appTitle}>Download our app (Coming Soon)</div>

              <div style={appButtons}>
                <div style={appBtn}> App Store</div>
                <div style={appBtn}>▶ Google Play</div>
              </div>
            </div>

            {/* Social Icons */}
            <div style={socialRow}>
              <SocialIcon>
                {/* Instagram */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17" cy="7" r="1.2" fill="currentColor"/>
                </svg>
              </SocialIcon>

              <SocialIcon>
                {/* Twitter / X */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 3H21l-6.5 7.4L22 21h-6.8l-5.3-7L3.8 21H1.7l7-8L2 3h6.9l4.8 6.4L18.9 3z"/>
                </svg>
              </SocialIcon>

              <SocialIcon>
                {/* LinkedIn */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zm6 7h4v2.5c.6-1 2-2.5 4-2.5 4 0 4.7 2.6 4.7 6V20h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20h-4z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={heading}>Company</h4>
            <p style={link}>About Us</p>
            <p style={link}>Careers</p>
            <p style={link}>Partners</p>
          </div>

          {/* Support */}
          <div>
            <h4 style={heading}>Support</h4>
            <ul style={list}>
              <li>
                <Link to="/help" style={navLink}>Help Center</Link>
              </li>
              <li>
<Link to="/contact" style={navLink}>Contact</Link>              </li>
              <li>
                <Link to="/privacy" style={navLink}>Privacy Policy</Link>
              </li>
              <li>
                <Link to="/faq" style={navLink}>FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={heading}>Legal</h4>
            <p style={link}>Terms of Service</p>
            <p style={link}>Refund Policy</p>
            <p style={link}>Security</p>
            <p style={link}>Compliance</p>
          </div>

        </div>

        {/* Divider */}
        <div style={divider} />

        {/* Bottom */}
        <div style={bottom}>
          <span>© 2026 STANFUT. All rights reserved.</span>
          <span style={{ opacity: 0.7 }}>
            Team Stanfut
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ================= SOCIAL ICON COMPONENT ================= */

function SocialIcon({ children }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
        background: hover
          ? "linear-gradient(135deg,#2563eb,#22c55e)"
          : "rgba(255,255,255,0.05)",
        color: hover ? "#ffffff" : "#cbd5e1",
        transform: hover ? "translateY(-3px)" : "translateY(0px)",
      }}
    >
      {children}
    </a>
  );
}

/* ================= STYLES ================= */

const wrap = {
  marginTop: "80px",
  background: "linear-gradient(135deg,#0f172a,#020617)",
  color: "#fff",
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "60px 30px 30px 30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "40px",
};

const brand = {
  fontWeight: 900,
  fontSize: "24px",
  letterSpacing: "1px",
  marginBottom: "12px",
};

const text = {
  opacity: 0.75,
  lineHeight: 1.6,
  fontSize: "14px",
  maxWidth: "260px",
};

const heading = {
  marginBottom: "14px",
  fontSize: "16px",
  fontWeight: 700,
};

const link = {
  opacity: 0.75,
  cursor: "pointer",
  marginBottom: "8px",
  transition: "0.3s",
};

const navLink = {
  color: "#fff",
  textDecoration: "none",
  opacity: 0.75,
  display: "inline-block",
  marginBottom: "8px",
};

const list = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const socialRow = {
  display: "flex",
  gap: "14px",
  marginTop: "20px",
};

/* Download App Styles */

const appSection = {
  marginTop: "24px",
};

const appTitle = {
  fontSize: "13px",
  opacity: 0.7,
  marginBottom: "10px",
};

const appButtons = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const appBtn = {
  padding: "8px 14px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.08)",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "0.3s",
};

const divider = {
  marginTop: "50px",
  marginBottom: "20px",
  height: "1px",
  background: "rgba(255,255,255,0.1)",
};

const bottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
  opacity: 0.6,
  flexWrap: "wrap",
  gap: "10px",
};