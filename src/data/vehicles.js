const vehicles = [
  {
    id: "bike1",
    name: "Honda Activa 6G",
    type: "bike",
    pricePerDay: 450,
    deposit: 1500,
    fuel: "Petrol",
    rating: 4.5,
    verified: true,
    location: "LPU Main Gate",
    description: "Comfortable and fuel‑efficient scooter, ideal for city rides.",

    // ✅ Main image
    image:
      "https://images.unsplash.com/photo-1616469829581-73993cb61f10?auto=format&fit=crop&w=900&q=80",

    // ✅ Gallery images (ALL WORKING)
    images: [
      "https://images.unsplash.com/photo-1616469829581-73993cb61f10?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1621786031872-c89b62f1d9d4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "bike2",
    name: "TVS Apache RTR",
    type: "bike",
    pricePerDay: 650,
    deposit: 2000,
    fuel: "Petrol",
    rating: 4.6,
    verified: true,
    location: "Uni Mall",
    description: "Powerful bike with sporty performance and great handling.",

    image:
      "https://images.unsplash.com/photo-1558981359-94ff2c6f4e66?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1558981359-94ff2c6f4e66?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558981033-0d878a2f2d4f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558981034-21a07c8ebf3f?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    id: "car1",
    name: "Maruti Swift",
    type: "car",
    pricePerDay: 1800,
    deposit: 5000,
    fuel: "Petrol",
    rating: 4.4,
    verified: true,
    location: "Phagwara",
    description: "Spacious hatchback suitable for city and highway travel.",

    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",

    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e70d7f6b5e2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1605559424697-1e4b74e09a1b?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

export default vehicles;
