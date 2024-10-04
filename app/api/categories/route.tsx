import Categoires from "@/models/Categoires";
import connect from "@/lib/data";
import { NextResponse,NextRequest } from "next/server";



const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {

    if(!NEXT_PUBLIC_API_BASE_URL) {
        return new NextResponse('API_BASE_URL is not defined', { status: 500 })
    }
    await connect();
    if(!connect) {
        return new NextResponse('Error connecting to MongoDB', { status: 500 })
    }
    try {
        const categories = await Categoires.find({});
        return new NextResponse(JSON.stringify(categories), { status: 200 })
    } catch (error:any) {
        return new NextResponse('Error fetching categories', { status: 500 })
    }
}

export async function POST (req:any) {

    if(!NEXT_PUBLIC_API_BASE_URL) {
        return new NextResponse('API_BASE_URL is not defined', { status: 500 })
    }


    await connect ();


    if(!connect) {
        return new NextResponse('Error connecting to MongoDB', { status: 500 })
    }


    try {
        const formData = await req.formData();
        const name = formData.get('name');   

        if (!name) {
            console.error('Missing name in the request');
            return new NextResponse('name is required', { status: 400 });
          }
          
        const newCategory = new Categoires({ name });
        await newCategory.save();

        if(newCategory) {
            return new NextResponse(JSON.stringify(newCategory), { status: 201 })}
        return new NextResponse('Error uploading file', { status: 500 })    

    }
     catch (error) {
        return new NextResponse('Error fetching categories', { status: 500 })}
}