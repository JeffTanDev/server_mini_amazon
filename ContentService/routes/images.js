import express from "express";
const router = express.Router();

router.get("/CarouselImgs", (req, res) => {
  try {
    const imageUrls = [
      "uploads/product1.jpg",
      "uploads/product2.jpg",
      "uploads/product3.jpg",
      "uploads/product4.jpg",
    ];
    // console.log("Sending response:", imageUrls);
    res.json(imageUrls);
  } catch (error) {
    console.error("Error in /CarouselImgs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/Showcase1", (req, res) => {
  try {
    const imageUrls = [
      "uploads/homepage-showcase1/card1-1.jpg",
      "uploads/homepage-showcase1/card1-2.jpg",
      "uploads/homepage-showcase1/card1-3.jpg",
      "uploads/homepage-showcase1/card1-4.jpg",
      "uploads/homepage-showcase1/card2-1.jpg",
      "uploads/homepage-showcase1/card2-2.jpg",
      "uploads/homepage-showcase1/card2-3.jpg",
      "uploads/homepage-showcase1/card2-4.jpg",
      "uploads/homepage-showcase1/card3-1.jpg",
      "uploads/homepage-showcase1/card3-2.jpg",
      "uploads/homepage-showcase1/card3-3.jpg",
      "uploads/homepage-showcase1/card3-4.jpg",
      "uploads/homepage-showcase1/card4-1.jpg",
      "uploads/homepage-showcase1/card4-2.jpg",
      "uploads/homepage-showcase1/card4-3.jpg",
      "uploads/homepage-showcase1/card4-4.jpg",
    ];
    res.json(imageUrls);
  } catch (error) {
    console.log("Error: ", error);
  }
});

router.get("/Showcase2", (req, res) => {
  try {
    const imageUrls = [
      "uploads/homepage-showcase2/track1.jpg",
      "uploads/homepage-showcase2/track2.jpg",
      "uploads/homepage-showcase2/track3.jpg",
      "uploads/homepage-showcase2/track4.jpg",
      "uploads/homepage-showcase2/track5.jpg",
      "uploads/homepage-showcase2/track6.jpg",
      "uploads/homepage-showcase2/track7.jpg",
      "uploads/homepage-showcase2/track8.jpg",
      "uploads/homepage-showcase2/track9.jpg",
      "uploads/homepage-showcase2/track10.jpg",
      "uploads/homepage-showcase2/track11.jpg",
      "uploads/homepage-showcase2/track12.jpg",
      "uploads/homepage-showcase2/track13.jpg",
      "uploads/homepage-showcase2/track14.jpg",
      "uploads/homepage-showcase2/track15.jpg",
      "uploads/homepage-showcase2/track16.jpg",
      "uploads/homepage-showcase2/track17.jpg",
      "uploads/homepage-showcase2/track18.jpg",
      "uploads/homepage-showcase2/track19.jpg",
      "uploads/homepage-showcase2/track20.jpg",
    ];
    res.json(imageUrls);
  } catch (error) {
    console.log("Error: ", error);
  }
});

export default router;
