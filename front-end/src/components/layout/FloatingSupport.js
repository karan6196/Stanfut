import { FaWhatsapp, FaPhoneAlt, FaRobot } from "react-icons/fa";
import { useState } from "react";
import AIChat from "./AIChat";

export default function FloatingSupport() {

  const [open, setOpen] = useState(false);

  const whatsappNumber = "919877993425";
  const phoneNumber = "+919877993425";

  return (
    <>
      <div style={wrapper}>

        {/* AI Assistant */}
        <div
          onClick={() => setOpen(true)}
          style={{ ...btn, background: "#7c3aed", cursor: "pointer" }}
        >
          <FaRobot size={18} />
        </div>

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

      {open && <AIChat onClose={() => setOpen(false)} />}
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
  zIndex: 999,
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