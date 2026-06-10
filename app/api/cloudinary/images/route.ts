// app/api/cloudinary/images/route.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder') || '';
  const maxResults = parseInt(searchParams.get('maxResults') || '20');

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: maxResults,
      resource_type: 'image',
    });

    const images = result.resources.map((resource: any) => ({
      secure_url: resource.secure_url,
      public_id: resource.public_id,
      width: resource.width,
      height: resource.height,
      created_at: resource.created_at,
    }));
    
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Cloudinary API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}