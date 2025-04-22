const express = require('express');
const { addFood, listFood, removeFood } = require("../controllers/FoodController");
const multer = require("multer");
const router = express.Router();

// Image Storage Engine - Use memory storage for Vercel/Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list", listFood);
router.post("/remove", removeFood);

module.exports = router;
