// pages/api/signup.ts
import bcrypt from 'bcrypt';
import User from '@/models/User';
import connect from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  if (!NEXT_PUBLIC_API_BASE_URL) {
    return new NextResponse(JSON.stringify({ error: 'NEXT_PUBLIC_API_URL is not defined' }), { status: 500 });
  }

  await connect();

  try {
    const formData = await req.formData();

    if (!formData) {
      return new NextResponse(JSON.stringify({ message: 'No form data provided' }), { status: 400 });
    }

    const username = formData.get('username');
    const phoneNumber = formData.get('phoneNumber');
    const password = formData.get('password'); 
    const address = formData.get('address');
    const zipcode = formData.get('zipcode');

    // if (!username || !phoneNumber || !password || address || zipcode) {
    //   return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    // }

    const existingUser = await User.findOne({ phoneNumber: phoneNumber });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'شما قبلا ثبت نام کرده اید لطفا از صفحه ورود وارد شوید' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);
    const newUser = new User({
      username,
      phoneNumber,
      password: hashedPassword,
      address,
      zipcode
    });

    await newUser.save();

    return new NextResponse(JSON.stringify({ message: 'ثبت نام شما با موفقیت انجام شد' }), { status: 200 });

  } catch (error: any) {
    console.error('Error during signup:', error);
    return new NextResponse(JSON.stringify({ error: 'Error processing signup' }), { status: 500 });
  }
}
