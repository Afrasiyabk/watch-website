// models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Watch",
        },
        price: String,
        qty: Number,
       },
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: String,
    totalPrice: Number,
    isPaid: { type: Boolean, default: true },
    isDelivered: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
