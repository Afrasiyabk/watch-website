// models/review.model.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required:true
},
product: {
type: mongoose.Schema.Types.ObjectId,
ref: "Watch",
required:true
},
rating: Number,
comment: String
},
{ timestamps: true }
);

export default mongoose.model("Review", reviewSchema);