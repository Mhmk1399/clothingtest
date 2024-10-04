import connect from "@/lib/data";
import { NextRequest,NextResponse } from "next/server";
import {Trending} from "@/models/trending";


export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connect();
    if(!connect) {
        return new NextResponse('Database connection error', { status: 500 });
    }
    const trendingId = params.id; 
    if (!trendingId) {
        return new NextResponse('trending ID is required', { status: 400 });
    }
    try {
        const deletedTrending = await Trending.findByIdAndDelete(trendingId);
        if (!deletedTrending) {
            return new NextResponse('trending not found', { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: 'trending deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting trending:', error);
        return new NextResponse('Error deleting trending', { status: 500 });
    }}

export const PATCH=async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connect();
    if(!connect) {
        return new NextResponse('Database connection error', { status: 500 });
    }
    const trendingId = params.id;
    if (!trendingId) {
        return new NextResponse('trending ID is required', { status: 400 });
    }
    try {
        const body = await req.json();
        const { image, link } = body;
        const updatedUser = await Trending.findByIdAndUpdate(
            trendingId,
            { image , link },
            { new: true }
        );
        if (!updatedUser) {
            return new NextResponse('trending not found', { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: 'trending updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating trending:', error);
        return new NextResponse('Error updating trending', { status: 500 });
    }
}