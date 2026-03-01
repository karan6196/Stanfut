export default function BrandLogo({ size = 42 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
      >
        <defs>
          <linearGradient id="stanfutGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        <path
          d="M80 20
             C60 5, 20 15, 30 45
             C35 60, 65 55, 75 75
             C85 95, 45 110, 25 90"
          stroke="url(#stanfutGradient)"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div>
        <div style={brandText}>STANFUT</div>
        <div style={brandLine}></div>
      </div>
    </div>
  );
}

const brandText = {
  fontSize: 22,
  fontWeight: 900,
  letterSpacing: 2,
  color: "#ffffff",
};
const brandLine = {
  height: 4,
  width: "100%",
  marginTop: 4,
  borderRadius: 4,
  background: "linear-gradient(90deg,#2563eb,#22c55e)"
};