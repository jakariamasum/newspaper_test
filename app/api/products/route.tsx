// // src/app/api/product.ts
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import Product from "@/model/Products";
// import { ProductTypes } from "@/types/productTypes";

// export async function POST(request: NextRequest) {
//   const payload: ProductTypes = await request.json();

//   console.log(payload);

//   if (!payload?.name || !payload?.quantity) {
//     return NextResponse.json(
//       { message: "Validation Failed" },
//       {
//         status: 400,
//       }
//     );
//   }

//   try {
//     const _product = await Product.create({
//       name: payload.name,
//       quantity: payload.quantity,
//     });

//     return NextResponse.json(
//       { message: "Product created successfully!", _product },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Failed to create product" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const products = await Product.find();
//     return NextResponse.json(
//       { message: "Products retrieved successfully!", products },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Failed to retrieve products" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/products.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Assuming the connection logic is in this file
import Product from "@/model/Products";
import { ProductTypes } from "@/types/productTypes";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
     mongoose.connection; 
    const payload: ProductTypes = await request.json();

    if (!payload?.name || !payload?.quantity) {
      return NextResponse.json(
        { message: "Validation Failed" },
        { status: 400 }
      );
    }

    const _product = await Product.create({
      name: payload.name,
      quantity: payload.quantity,
    });

    return NextResponse.json(
      { message: "Product created successfully!", _product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await mongoose.connection; 

    const products = await Product.find();
    return NextResponse.json(
      { message: "Products retrieved successfully!", products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { message: "Failed to retrieve products" },
      { status: 500 }
    );
  }
}
