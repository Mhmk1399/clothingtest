import Color from "@/models/Color";
import connect from "@/lib/data";
import { NextResponse } from "next/server";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const GET = async () => {
  if (!NEXT_PUBLIC_API_BASE_URL) {
    return new NextResponse('API_BASE_URL is not defined', { status: 500 });
  }
  await connect();
  if (!connect) {
    return new NextResponse('Error connecting to MongoDB', { status: 500 });
  }
  try {
    const colors = await Color.find({});
    return new NextResponse(JSON.stringify(colors), { status: 200 });
  } catch (error) {
    console.error('Error fetching colors:', error);
    return new NextResponse('Error fetching colors', { status: 500 });
  }
};

export const POST = async (req:any) => {
  if (!NEXT_PUBLIC_API_BASE_URL) {
    return new NextResponse('API_BASE_URL is not defined', { status: 500 });
  }
  await connect();
  if (!connect) {
    return new NextResponse('Error connecting to MongoDB', { status: 500 });
  }
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const hexCode = formData.get('hexCode');

    if (!name || !hexCode) {
      console.error('Missing title or hexcode in the request');
      return new NextResponse('Title and hexcode are required', { status: 400 });
    }

    const newColor = new Color({ name, hexCode });
    await newColor.save();
    return new NextResponse(JSON.stringify(newColor), { status: 201 });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return new NextResponse('Error uploading file', { status: 500 });
  }
};