// pages/api/login.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connect from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function POST(req: NextRequest) {
  await connect();

  try {
    const formData = await req.formData();
    const phoneNumber = formData.get('phoneNumber');
    const password = formData.get('password');

    if (!phoneNumber || !password) {
      return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password as string, user.password);
    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const token = jwt.sign({ userId: user._id, userName: user.userName }, JWT_SECRET, { expiresIn: '1h' });

    return new NextResponse(JSON.stringify({ token }), { status: 200 });

  } catch (error: any) {
    console.error('Error during login:', error);
    return new NextResponse(JSON.stringify({ error: 'Error processing login' }), { status: 500 });
  }
}
