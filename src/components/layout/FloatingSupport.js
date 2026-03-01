import { FaWhatsapp, FaPhoneAlt, FaRobot } from "react-icons/fa";
import { useState } from "react";

export default function FloatingSupport() {

  const [open, setOpen] = useState(false);

  const whatsappNumber = "919877993425";
  const phoneNumber = "+919877993425";

  return (
    <>
      <div style={wrapper}>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...btn, background: "#25D366" }}
        >
          <FaWhatsapp size={20} />
        </a>

        {/* Phone */}
        <a
          href={`tel:${phoneNumber}`}
          style={{ ...btn, background: "#2563eb" }}
        >
          <FaPhoneAlt size={18} />
        </a>

      </div>

      
    </>
  );
}

const wrapper = {
  position: "fixed",
  right: "20px",
  bottom: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  zIndex: 1000,
};

const btn = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
};