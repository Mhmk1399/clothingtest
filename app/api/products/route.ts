import connect from "@/lib/data";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import path from "path";
import { promises as fsPromises } from 'fs';


const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET (req:any) {
    if(!NEXT_PUBLIC_API_BASE_URL){
        return new NextResponse('API_BASE_URL is not defined', { status: 500 })
    }
    await connect();

    if(!connect){
        return new NextResponse('Error connecting to MongoDB', { status: 500 })
    }

    try{
        const product = await Product.find({});
        return new NextResponse(JSON.stringify(product),{status:201})
    }
    catch(error:any){
        return new NextResponse('error getting the file ',{status:500})
    }
}


export async function POST(req: any) {
    if (!NEXT_PUBLIC_API_BASE_URL) {
        console.error('NEXT_PUBLIC_API_BASE_URL is not defined');
        return new NextResponse('API_BASE_URL is not defined', { status: 500 });
    }

    await connect();

    if (!connect) {
        console.error('Error connecting to MongoDB');
        return new NextResponse('Error connecting to MongoDB', { status: 500 });
    }

    try {
        const formData = await req.formData();
        const files = formData.getAll('files'); // Get all files
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const colors = formData.get('colors'); // IDs of selected colors
        const sizes = formData.get('sizes'); // IDs of selected sizes
        const categories = formData.get('categories'); // IDs of selected categories
        const paymentLink = formData.get('paymentLink');

        if (!files.length) {
            console.error('No files found');
            return new NextResponse('No files found', { status: 400 });
        }

        const images = [];
        for (const file of files) {
            if (!(file instanceof File)) {
                console.error('Invalid file type');
                continue;
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file.name.replaceAll(' ', '_');
            const filePath = path.join(process.cwd(), 'public/assets', filename);

            // Create the directory if it doesn't exist
            await fsPromises.mkdir(path.dirname(filePath), { recursive: true });

            await fsPromises.writeFile(filePath, buffer);

            const fileUrl = `${NEXT_PUBLIC_API_BASE_URL}/assets/${filename}`;
            images.push(fileUrl);
        }

        const newProduct = {
            title,
            description,
            price,
            colors: colors.split(','), // Convert comma-separated string to array
            sizes: sizes.split(','),
            categories: categories.split(','),
            paymentLink,
            images, // Array of image URLs
        };

        console.log('New Product Object:', newProduct);

        await Product.create(newProduct);

        return new NextResponse('Product uploaded successfully', { status: 201 });
    } catch (error) {
        console.error('Error uploading the product:', error);
        return new NextResponse('Error uploading the product', { status: 500 });
    }
}