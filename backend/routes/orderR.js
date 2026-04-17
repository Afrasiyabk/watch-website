import express from "express";
import Order from "../modules/orderM.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { isMasterAdmin } from "../middleware/isMasterAdmin.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    } = req.body;

    // ❌ validation
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // ✅ create order
    const order = new Order({
      user: req.user._id, // from auth middleware
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      order: createdOrder
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get orders for logged in user
router.get("/myorders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("orderItems.product", "name image price isPaid isDelivered");
    res.json({ success: true, orders });
  }
    catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders (admin)
router.get("/", authMiddleware ,isMasterAdmin , async (req, res) => {
  try {
    const orders = await Order.find().sort({createdAt : -1});
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// update order to isDelivered (admin)
router.put("/isDeliver/:id", authMiddleware , isMasterAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { isDelivered: true },
       { returnDocument: "after" }
    );
    if (!updatedOrder) {
      return res.status(500).json({succcess:false,message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// admin delete order
router.delete('/delete/:id', isMasterAdmin , async(req,res)=>{
  try {
    const Delete = await Order.findByIdAndDelete(req.params.id);
    if (!Delete) {
    res.status(500).json({success:false,message:'Order Id not Found'})
    }
    res.json({success:true,message:'order Deleted Successfuly'})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
});

export default router;