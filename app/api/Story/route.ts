import { NextResponse,NextRequest } from 'next/server';
import connect from '@/lib/data';
import Story from '@/models/Story';
import path from "path";
import { promises as fsPromises } from 'fs';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  if(!NEXT_PUBLIC_API_BASE_URL) {
    return new NextResponse('API_BASE_URL is not defined', { status: 500 })
  }
  await connect();
  if(!connect){
    return new NextResponse('Error connecting to MongoDB', { status: 500 })
  }
  try {
    const stories = await Story.find({});
    return new NextResponse(JSON.stringify(stories), { status: 200 })
  } catch (error) {
    return new NextResponse('Error fetching stories', { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  
  if (!NEXT_PUBLIC_API_BASE_URL) {
    return new NextResponse('API_BASE_URL is not defined', { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    const link = formData.get('link');

    if (!file || !(file instanceof File)) {
      return new NextResponse('File not found or invalid file type', { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(' ', '_');
    const filePath = path.join(process.cwd(), 'public/assets', filename);

    // Create the directory if it doesn't exist
    await fsPromises.mkdir(path.dirname(filePath), { recursive: true });

    await fsPromises.writeFile(filePath, buffer);

    const mediaType = file.type.startsWith('video') ? 'video' : 'image';

    const newMedia = {
      title,
      link,
      [mediaType]: `${NEXT_PUBLIC_API_BASE_URL}/assets/${filename}`,
    };

    await Story.create(newMedia);
 

    return new NextResponse('File uploaded successfully', { status: 201 });
  } catch (error: any) {
    console.error('Error processing request:', error);
    return new NextResponse('Error uploading file', { status: 500 });
  }
};