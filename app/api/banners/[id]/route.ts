import connect from "@/lib/data";
import { NextRequest,NextResponse } from "next/server";
import { banner } from "@/models/banners";



export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connect();
    if(!connect) {
        return new NextResponse('Database connection error', { status: 500 });
    }
    const bannerId = params.id; 
    if (!bannerId) {
        return new NextResponse('Banner ID is required', { status: 400 });
    }
    try {
        const deletdBanner = await banner.findByIdAndDelete(bannerId);
        if (!deletdBanner) {
            return new NextResponse('Banner not found', { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: 'Banner deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting Banner:', error);
        return new NextResponse('Error deleting Banner', { status: 500 });
    }}

export const PATCH=async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connect();
    if(!connect) {
        return new NextResponse('Database connection error', { status: 500 });
    }
    const bannerId = params.id;
    if (!bannerId) {
        return new NextResponse('User ID is required', { status: 400 });
    }
    try {
        const body = await req.json();
        const { name, image, link} = body;
        const updatedBanner = await banner.findByIdAndUpdate(
            bannerId,
            { name, image, link },
            { new: true }
        );
        if (!updatedBanner) {
            return new NextResponse('banner not found', { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: 'banner updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating banner:', error);
        return new NextResponse('Error updating banner', { status: 500 });
    }
}