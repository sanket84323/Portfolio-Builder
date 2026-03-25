import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import { getUserFromRequest } from '@/lib/auth';
import { generateSlug } from '@/lib/utils';
import { SKILL_CATEGORIES_DEFAULT } from '@/lib/constants';

export async function GET(req: NextRequest) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const portfolios = await Portfolio.find({ userId: authUser.userId }).sort({ updatedAt: -1 });
    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error('Get portfolios error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { title } = body;

    const slug = generateSlug(authUser.username);

    const portfolio = await Portfolio.create({
      userId: authUser.userId,
      title: title || 'My Portfolio',
      publicSlug: slug,
      skillCategories: body.skillCategories || SKILL_CATEGORIES_DEFAULT,
      themeSettings: body.themeSettings || {},
      role: body.role || '',
      tagline: body.tagline || '',
      about: body.about || '',
      college: body.college || '',
      degree: body.degree || '',
      careerFocus: body.careerFocus || '',
      interests: body.interests || [],
      projects: body.projects || [],
      education: body.education || [],
      achievements: body.achievements || [],
      socialLinks: body.socialLinks || {},
    });

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('Create portfolio error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
