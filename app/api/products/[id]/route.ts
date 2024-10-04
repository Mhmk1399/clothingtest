import connect from "@/lib/data";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: { params: { id: string } }) {
  const { id } = params;
  await connect();

  try {
    // Populate colors, sizes, and categories to get their full details
    const product = await Product.findById(id)
    
      

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching product", { status: 500 });
  }
}
