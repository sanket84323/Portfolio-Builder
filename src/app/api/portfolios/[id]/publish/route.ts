import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { getUserFromRequest } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const { action, slug } = await req.json();

    const portfolio = await Portfolio.findOne({ _id: id, userId: authUser.userId });
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    if (action === 'publish') {
      // Check slug uniqueness if provided
      if (slug && slug !== portfolio.publicSlug) {
        const existing = await Portfolio.findOne({ publicSlug: slug, _id: { $ne: id } });
        if (existing) {
          return NextResponse.json({ error: 'This URL is already taken. Please choose another.' }, { status: 409 });
        }
        portfolio.publicSlug = slug;
      }

      portfolio.status = 'published';
      portfolio.publishedAt = new Date();
      portfolio.publishedUrl = `${process.env.NEXT_PUBLIC_APP_URL}/p/${portfolio.publicSlug}`;
      await portfolio.save();

      return NextResponse.json({
        portfolio,
        publishedUrl: portfolio.publishedUrl,
        message: 'Portfolio published successfully!',
      });
    }

    if (action === 'unpublish') {
      portfolio.status = 'draft';
      await portfolio.save();
      return NextResponse.json({ portfolio, message: 'Portfolio unpublished.' });
    }

    if (action === 'check-slug') {
      const targetSlug = slug || portfolio.publicSlug;
      const existing = await Portfolio.findOne({ publicSlug: targetSlug, _id: { $ne: id } });
      return NextResponse.json({ available: !existing });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
