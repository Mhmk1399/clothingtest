import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { banner } from "@/models/banners";



export const GET = async () => {
  await connect();
  if (!connect) {
    return new NextResponse('Error connecting to MongoDB', { status: 500 });
  }
  try {
    const Banner = await banner.find({});
    return NextResponse.json(Banner);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return new NextResponse('Error fetching banners', { status: 500 });
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
      const name = formData.get('name');
      const image = formData.get('image');
      const link = formData.get('link');
      
  
      // You can now create the new product object here or save it to your MongoDB
      const newBanner = {
        name,
        image,
        link,
      };
  
       const savedBanner = await banner.create(newBanner); 
  
      console.log('New banner created:', newBanner);
      
      
      return new NextResponse(JSON.stringify(newBanner), { status: 201 });
    } catch (error) {
      console.error('Error processing POST request:', error);
      return new NextResponse('Error processing request', { status: 500 });
    }
  };