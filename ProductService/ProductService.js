import express from "express";

const app = express();
const PORT = 8003;

const mockProducts = [
  {
    id: 1,
    title: "2024 new laptop 15.6 inches",
    price: 4999,
    rating: 4,
    image: "https://via.placeholder.com/200",
    reviews: 128,
    delivery: {
      freeDelivery: true,
      nextDayDelivery: true,
    },
  },
  {
    id: 2,
    title: "wireless bluetooth headphones active noise cancellation",
    price: 899,
    rating: 5,
    image: "https://via.placeholder.com/200",
    reviews: 256,
    delivery: {
      freeDelivery: true,
      nextDayDelivery: false,
    },
  },
  {
    id: 3,
    title: "smart watch sports health monitoring",
    price: 1299,
    rating: 4,
    image: "https://via.placeholder.com/200",
    reviews: 89,
    delivery: {
      freeDelivery: false,
      nextDayDelivery: true,
    },
  },
  {
    id: 4,
    title: "mechanical keyboard rgb backlit",
    price: 399,
    rating: 3,
    image: "https://via.placeholder.com/200",
    reviews: 45,
    delivery: {
      freeDelivery: true,
      nextDayDelivery: false,
    },
  },
];

app.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) {
    res.status(400).json({ message: "Missing search query" });
  }
  res.status(200).json(mockProducts);
});

app.listen(PORT, () => {
  console.log(`Product Service running at http://localhost:${PORT}`);
});
