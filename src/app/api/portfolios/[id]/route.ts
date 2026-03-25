import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { getUserFromRequest } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const portfolio = await Portfolio.findOne({ _id: id, userId: authUser.userId });
    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('Get portfolio error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // Remove protected fields from update
    delete body.userId;
    delete body._id;

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: id, userId: authUser.userId },
      { ...body, updatedAt: new Date() },
      { returnDocument: 'after' }
    );

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('Update portfolio error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const portfolio = await Portfolio.findOneAndDelete({ _id: id, userId: authUser.userId });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
