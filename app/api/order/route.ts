import connect from "@/lib/data";
import { NextRequest,NextResponse } from "next/server";
import Order from "@/models/OrderStatus";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "secret";




export async function POST(req: NextRequest) {
  await connect();

  const token = req.headers.get('Authorization')?.split(' ')[1];
  console.log('Authorization Header:', req.headers.get('Authorization')); // Log the Authorization header
  if (!token) {
    console.log('No token provided'); // Log when no token is provided
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    console.log('Decoded Token:', decoded); // Log the decoded token
    const userId = decoded.userId;
    const userName = decoded.userName;

    const requestBody = await req.json();
    console.log('Request Body:', requestBody); // Log the entire request body

    const { productId, productTitle, selectedColor, selectedSize,productPrice, paymentStatus, paymentId } = requestBody;

    // Check for missing fields and log the missing ones
    if (!userId || !productId || !productTitle || !selectedColor || !selectedSize  || !paymentStatus) {
      console.log('Missing fields:', {
        userId,
        productId,
        productTitle,
        selectedColor,
        selectedSize,
        productPrice,
        paymentStatus
      });
      return new NextResponse(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
    }

    const newOrder = new Order({
      userId,
      userName,
      productPrice,
      productId,
      productTitle,
      selectedColor,
      selectedSize,
      paymentStatus,
      paymentId,
    });

    console.log('New Order Object:', newOrder); // Log the order object before saving

    await newOrder.save();
    console.log('Order saved successfully'); // Log success

    return new NextResponse(JSON.stringify({ message: 'Order saved successfully' }), { status: 201 });

  } catch (error: any) {
    console.error('Error processing order:', error.message || error); // Log any errors that occur
    return new NextResponse(JSON.stringify({ error: 'Error processing order' }), { status: 500 });
  }
}



export async function GET (req: NextRequest) {
  await connect();
  if(!connect){
    return new NextResponse(JSON.stringify({ message: 'Error connecting to database' }), { status: 500 });
  }
  try {
    const orders = await Order.find({});
    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching orders' }), { status: 500 });
  }

}