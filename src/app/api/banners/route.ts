import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://rfb-backend.test/api/banners', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Jika API membutuhkan autentikasi
      // headers: {
      //   'Authorization': `Bearer ${process.env.API_TOKEN}`,
      // },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch banners');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
