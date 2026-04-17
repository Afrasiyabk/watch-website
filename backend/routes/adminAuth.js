import express from "express";
import jwt from "jsonwebtoken";
import User from "../modules/userM.js";
import Watch from "../modules/productM.js";
import Order from "../modules/orderM.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { isMasterAdmin } from "../middleware/isMasterAdmin.js";

const router = express.Router();

router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  // Check credentials against .env
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // 1. Create the Payload with a static _id
    const payload = {
      _id: "ADMIN_MASTER_SYNC", // ✅ This is the ID you were missing
      isAdmin: true,
      role: "super-admin",
    };

    // 2. Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Session expired or invalid token" });
    }

    return res.status(200).json({
      success: true,
      message: "Welcome, Master Admin",
      token,
      user: { name: "Master Admin", email: process.env.ADMIN_EMAIL },
    });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid Admin Credentials" });
});

// GET DASHBOARD DATA
router.get("/dashboard", authMiddleware, isMasterAdmin, async (req, res) => {
  try {
    // ✅ COUNTS
    const [usersCount, ordersCount, productsCount, activeOrdersCount] =
      await Promise.all([
        User.countDocuments(),
        Order.countDocuments(),
        Watch.countDocuments(),
        Order.countDocuments({ isDelivered: false }), // 🔥 active orders
      ]);

    // ✅ REVENUE
    const revenueData = await Order.aggregate([
      { $match: { isDelivered: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // ✅ RECENT ORDERS
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "fullName email")
      .populate("orderItems.product", "name price");

    // ✅ ACTIVE ORDERS LIST (optional UI)
    const activeOrders = await Order.find({ isDelivered: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "fullName");

      const users = await User.find();

    res.json({
      success: true,
      stats: {
        usersCount,
        ordersCount,
        productsCount,
        totalRevenue,
        activeOrdersCount, // 🔥 NEW
      },
      users,
      recentOrders,
      activeOrders, // 🔥 for UI table
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/ChartData", authMiddleware, isMasterAdmin, async (req, res) => {
  try {
    const filter = req.query.filter || "day";

    let format = "%Y-%m-%d";

    if (filter === "month") format = "%Y-%m";
    if (filter === "year") format = "%Y";

    const ordersChart = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format, date: "$createdAt" },
          },
          totalOrders: { $sum: 1 },
          revenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      ordersChart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
