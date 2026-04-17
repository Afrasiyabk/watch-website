// models/watch.model.js
import mongoose from "mongoose";

const watchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    description: String,
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
       ref: "Category", required: true },
    stock: Number,
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", required : true
    }
  },
  { timestamps: true },
);

watchSchema.index({
  name: "text",
  brand: "text",
  description: "text"
}, {
  weights: {
    name: 5,
    brand: 2,
    description: 1
  }
});

const Watch = mongoose.model("Watch", watchSchema);

export default Watch;
