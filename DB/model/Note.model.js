import { Schema, model, Types } from "mongoose";
const noteSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    ProductCategory: {
      type: String,
      required: true,
    },
    ProductDesc: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      
    },
  },
  {
    timestamps: true,
  }
);
const noteModel = model("Note", noteSchema);
export default noteModel;
