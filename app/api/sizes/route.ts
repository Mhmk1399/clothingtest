import connect from "@/lib/data";
import Size from "@/models/Size";
import { NextRequest,NextResponse } from "next/server";


const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {

    if(!NEXT_PUBLIC_API_BASE_URL){
        return new NextResponse('API_BASE_URL is not defined', { status: 500 })
    }
    await connect ();
    if(!connect){
        return new NextResponse('Error connecting to MongoDB', { status: 500 })
    }
    try{

        const sizes = await Size.find({});

        return new NextResponse(JSON.stringify(sizes), { status: 200 })

    }
    catch(error:any){
        return new NextResponse('Error fetching sizes', { status: 500 })
    }
}

export async function POST (req:any) {
    if (!NEXT_PUBLIC_API_BASE_URL) {
        return new NextResponse('API_BASE_URL is not defined', { status: 500 })}

    await connect ();

    if(!connect) {
        return new NextResponse('Error connecting to MongoDB', { status: 500 })}

    try {

        const formData = await req.formData();
        const name = formData.get('name');
        const shoulderWidth = formData.get('shoulderWidth');
        const chestWidth = formData.get('chestWidth');
        const topLength = formData.get('topLength');
        const bottomLength = formData.get('bottomLength');
        const waistWidth = formData.get('waistWidth');
        const shoesWidth = formData.get('shoesWidth');
        const shoesLength = formData.get('shoesLength');

        if (!name ) {
            return new NextResponse('name is required', { status: 400 })}

        const newSize = new Size({ name, shoulderWidth, chestWidth, topLength, bottomLength, waistWidth, shoesWidth, shoesLength });
        await newSize.save();
        return new NextResponse(JSON.stringify(newSize), { status: 201 })
        
    }catch(error:any){
        return new NextResponse('Error uploading file', { status: 500 })
    }    
    }