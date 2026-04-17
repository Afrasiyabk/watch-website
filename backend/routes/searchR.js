// routes/search.js
import express from "express";
import Watches from "../modules/productM.js";
const route = express.Router();




route.get("/product-search", async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) return res.json({ products: [] });

    const isShort = q.length < 3;

    const query = isShort
      ? { name: { $regex: q, $options: "i" } }
      : { $text: { $search: q } };

    const products = await Watches.find(query)
      .select("name images price")
      .limit(10);

    res.json({ products });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 });



export default route;