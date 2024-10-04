import connect from "@/lib/data";
import { NextRequest,NextResponse } from "next/server";
import Order from "@/models/OrderStatus";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "secret";








export async function PATCH(req: NextRequest) {
    await connect();
  
    const { orderId, paymentStatus } = await req.json();  // Updated to expect `orderId`
  
    if (!orderId || !paymentStatus) {
      return new NextResponse(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
    }
  
    try {
      const order = await Order.findByIdAndUpdate(
        orderId,  // Update by `_id` directly
        { paymentStatus },
        { new: true }
      );
  
      if (!order) {
        return new NextResponse(JSON.stringify({ message: 'Order not found' }), { status: 404 });
      }
  
      return new NextResponse(JSON.stringify({ message: 'Order updated successfully', order }), { status: 200 });
  
    } catch (error: any) {
      console.error('Error updating order:', error);
      return new NextResponse(JSON.stringify({ error: 'Error updating order' }), { status: 500 });
    }
  }
  