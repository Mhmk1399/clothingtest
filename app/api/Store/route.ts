import connect from "@/lib/data";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: any) {
    await connect();

    try {
        // Fetch products with populated categories
        const products = await Product.find({}).populate('categories').exec();

        // Group products by category
        const groupedProducts = products.reduce((acc: any, product: any) => {
            product.categories.forEach((category: any) => {
                if (!acc[category._id]) {
                    acc[category._id] = {
                        categoryName: category.name,
                        products: [],
                    };
                }
                acc[category._id].products.push(product);
            });
            return acc;
        }, {});

        return new NextResponse(JSON.stringify(groupedProducts), { status: 201 });
    } catch (error: any) {
        return new NextResponse('Error getting the file ', { status: 500 });
    }
}
