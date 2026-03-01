// src/utils/storage.js

const FAV_KEY = "stanfut_favorites";
const RECENT_KEY = "stanfut_recent";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}

export function toggleFavorite(vehicleId) {
  const favs = getFavorites();
  const exists = favs.includes(vehicleId);

  const updated = exists ? favs.filter((id) => id !== vehicleId) : [...favs, vehicleId];
  localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  return updated;
}

export function isFavorite(vehicleId) {
  return getFavorites().includes(vehicleId);
}

export function addRecentlyViewed(vehicleId) {
  try {
    const list = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    const updated = [vehicleId, ...list.filter((id) => id !== vehicleId)].slice(0, 6);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    localStorage.setItem(RECENT_KEY, JSON.stringify([vehicleId]));
    return [vehicleId];
  }
}

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}
