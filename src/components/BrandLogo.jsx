import logo from "../assets/logo.png";

export default function BrandLogo({ size = 60 }) {
  return (
    <div style={wrap}>
      
      {/* LEFT ICON */}
      <img
        src={logo}
        alt="logo"
        style={{
          height: size,
          width: size,
          objectFit: "contain",
        }}
      />

      {/* RIGHT TEXT */}
      <div style={textWrap}>
        
        {/* STANFUT */}
        <div style={title}>STANFUT</div>

        {/* LINE */}
        <div style={lineTop} />

        {/* RENTALS */}
        <div style={subtitle}>Rentals</div>

        {/* LINE */}
        <div style={lineBottom} />

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrap = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const textWrap = {
  display: "flex",
  flexDirection: "column",
  lineHeight: 1,
};

/* STANFUT */
const title = {
  fontSize: "20px",
  fontWeight: 900,
  color: "#ffffff",
  letterSpacing: "1.5px",
};

/* TOP LINE */
const lineTop = {
  height: "3px",
  width: "90px",
  background: "linear-gradient(90deg,#38bdf8,#22c55e)",
  borderRadius: "2px",
  margin: "4px 0",
};

/* RENTALS */
const subtitle = {
  fontSize: "16px",
  color: "#cbd5e1",
  fontWeight: 600,
};

/* BOTTOM LINE */
const lineBottom = {
  height: "3px",
  width: "70px",
  background: "linear-gradient(90deg,#38bdf8,#22c55e)",
  borderRadius: "2px",
  marginTop: "4px",
};