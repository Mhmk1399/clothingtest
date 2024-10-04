import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { Trending } from "@/models/trending";




export const GET = async () => {
  await connect();
  if (!connect) {
    return new NextResponse('Error connecting to MongoDB', { status: 500 });
  }
  try {
    const products = await Trending.find({});
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Error fetching products', { status: 500 });
  }
}
 
export const POST = async (req: NextRequest) => {
    // Ensure you have a successful MongoDB connection
    try {
      await connect();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return new NextResponse('Error connecting to MongoDB', { status: 500 });
    }
  
    // Handle form data processing
    try {
      const formData = await req.formData();
      
      // Extract fields from form data
      const link = formData.get('link');
      const image = formData.get('image');
      
  
      // You can now create the new product object here or save it to your MongoDB
      const newtrending = {
        link,
        image,
      };
  
       const savedtrending = await Trending.create(newtrending); 
  
      console.log('New trending created:', newtrending);
      
      
      return new NextResponse(JSON.stringify(newtrending), { status: 201 });
    } catch (error) {
      console.error('Error processing POST request:', error);
      return new NextResponse('Error processing request', { status: 500 });
    }
  };