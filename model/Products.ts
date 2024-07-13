// // import { Schema, model, models } from "mongoose";

// import { ProductTypes } from "@/types/productTypes";
// import { model, models, Schema } from "mongoose";

// const productSchema = new Schema<ProductTypes>(
//   {
//     name: { type: String, required: true },
//     quantity: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// const ProductModel =
//   models.Product || model<ProductTypes>("Product", productSchema);

// export default ProductModel;
// src/model/Products.ts
import { Schema, model, models } from "mongoose";
import { ProductTypes } from "@/types/productTypes";

const productSchema = new Schema<ProductTypes>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = models.Product || model<ProductTypes>("Product", productSchema);

export default Product;
