import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { slug } = await params;

    const portfolio = await Portfolio.findOne({ publicSlug: slug, status: 'published' });
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found or not published' }, { status: 404 });
    }

    // Increment view count
    await Portfolio.findByIdAndUpdate(portfolio._id, { $inc: { viewCount: 1 } });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('Public portfolio error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
