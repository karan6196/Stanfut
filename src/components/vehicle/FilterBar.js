import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSliders, FiX } from "react-icons/fi";

export default function FilterBar({
  sort,
  onSortChange,
  fuel,
  onFuelChange,
  location,
  onLocationChange,
  locations = [],
  rating,
  onRatingChange,
  verifiedOnly,
  onVerifiedChange,
  price,
  onPriceChange,
  minPrice = 0,
  maxPrice = 5000,
}) {
  const [openMobile, setOpenMobile] = useState(false);

  const resetFilters = () => {
    onSortChange("");
    onFuelChange("");
    onLocationChange("");
    onRatingChange("");
    onVerifiedChange(false);
    onPriceChange(maxPrice);
  };

  return (
    <>
      {/* DESKTOP FILTER BAR */}
      <div style={desktopBar}>
        <div style={leftSection}>
          <Select
            label="Sort"
            value={sort}
            onChange={onSortChange}
            options={[
              { value: "", label: "Default" },
              { value: "priceLow", label: "Price ↑" },
              { value: "priceHigh", label: "Price ↓" },
              { value: "ratingHigh", label: "Top Rated" },
            ]}
          />

          <Select
            label="Fuel"
            value={fuel}
            onChange={onFuelChange}
            options={[
              { value: "", label: "All Fuel" },
              { value: "Petrol", label: "Petrol" },
              { value: "Diesel", label: "Diesel" },
              { value: "EV", label: "EV" },
            ]}
          />

          <Select
            label="Rating"
            value={rating}
            onChange={onRatingChange}
            options={[
              { value: "", label: "All Ratings" },
              { value: "4.5", label: "4.5+" },
              { value: "4.0", label: "4.0+" },
            ]}
          />
        </div>

        <div style={rightSection}>
          <button
            style={{
              ...pill,
              background: verifiedOnly ? "#2563eb" : "#1e293b",
              color: verifiedOnly ? "#fff" : "#cbd5e1",
            }}
            onClick={() => onVerifiedChange(!verifiedOnly)}
          >
            ✓ Verified
          </button>

          <button style={resetBtn} onClick={resetFilters}>
            Reset
          </button>

          {/* MOBILE BUTTON */}
          <button style={mobileBtn} onClick={() => setOpenMobile(true)}>
            <FiSliders /> Filters
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET */}
      <AnimatePresence>
        {openMobile && (
          <>
            <motion.div
              style={overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMobile(false)}
            />

            <motion.div
              style={sheet}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
            >
              <div style={sheetHeader}>
                <div style={dragHandle} />
                <button
                  style={closeBtn}
                  onClick={() => setOpenMobile(false)}
                >
                  <FiX size={20} />
                </button>
              </div>

              <div style={sheetContent}>
                <h3 style={sheetTitle}>Filters</h3>

                <Select
                  label="Sort"
                  value={sort}
                  onChange={onSortChange}
                  options={[
                    { value: "", label: "Default" },
                    { value: "priceLow", label: "Price ↑" },
                    { value: "priceHigh", label: "Price ↓" },
                    { value: "ratingHigh", label: "Top Rated" },
                  ]}
                />

                <Select
                  label="Fuel"
                  value={fuel}
                  onChange={onFuelChange}
                  options={[
                    { value: "", label: "All Fuel" },
                    { value: "Petrol", label: "Petrol" },
                    { value: "Diesel", label: "Diesel" },
                    { value: "EV", label: "EV" },
                  ]}
                />

                <Select
                  label="Rating"
                  value={rating}
                  onChange={onRatingChange}
                  options={[
                    { value: "", label: "All Ratings" },
                    { value: "4.5", label: "4.5+" },
                    { value: "4.0", label: "4.0+" },
                  ]}
                />

                {/* Price Slider */}
                <div style={sliderWrap}>
                  <label style={label}>Max Price: ₹{price}</label>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={price}
                    onChange={(e) =>
                      onPriceChange(Number(e.target.value))
                    }
                    style={slider}
                  />
                </div>

                {/* Verified */}
                <button
                  style={{
                    ...pill,
                    marginTop: 12,
                    background: verifiedOnly ? "#2563eb" : "#1e293b",
                    color: verifiedOnly ? "#fff" : "#cbd5e1",
                  }}
                  onClick={() =>
                    onVerifiedChange(!verifiedOnly)
                  }
                >
                  ✓ Verified Only
                </button>

                <button
                  style={applyBtn}
                  onClick={() => setOpenMobile(false)}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= COMPONENTS ================= */

function Select({ label, value, onChange, options }) {
  return (
    <div style={selectWrap}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={select}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================= STYLES ================= */

const desktopBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  borderRadius: "14px",
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.06)",
  marginBottom: "20px",
  flexWrap: "wrap",
  gap: "10px",
};

const leftSection = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const rightSection = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const selectWrap = {
  borderRadius: "999px",
  padding: "0px", // remove inner padding
  border: "1px solid rgba(255,255,255,0.08)",
  background: "transparent"
};

const select = {
  backgroundColor: "#1e293b",   // IMPORTANT
  border: "none",
  color: "#ffffff",
  fontWeight: "600",
  outline: "none",
  cursor: "pointer",
  width: "100%",
  padding: "8px 16px",
  borderRadius: "999px",
};

const pill = {
  padding: "8px 16px",
  borderRadius: "999px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
};

const resetBtn = {
  background: "transparent",
  color: "#94a3b8",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
};

const mobileBtn = {
  display: "none",
};

/* Mobile Styles */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  zIndex: 999,
};

const sheet = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#0f172a",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  padding: "20px",
  zIndex: 1000,
  maxHeight: "90vh",
  overflowY: "auto",
};

const sheetHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const dragHandle = {
  width: "40px",
  height: "4px",
  background: "#334155",
  borderRadius: "10px",
  margin: "0 auto 10px",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};

const sheetContent = {
  marginTop: "10px",
};

const sheetTitle = {
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "700",
  color: "#fff",
};

const sliderWrap = {
  marginTop: "20px",
};

const slider = {
  width: "100%",
  marginTop: "8px",
};

const label = {
  color: "#cbd5e1",
  fontWeight: "600",
};

const applyBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};