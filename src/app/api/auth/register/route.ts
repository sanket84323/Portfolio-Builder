import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, password, username } = body;

    if (!name || !email || !password || !username) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const slug = slugify(username);
    if (!slug || slug.length < 3) {
      return NextResponse.json({ error: 'Username must be at least 3 characters' }, { status: 400 });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username: slug }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    const user = await User.create({ name, email, password, username: slug });

    const token = signToken({ userId: user._id.toString(), email: user.email, username: user.username });

    const response = NextResponse.json(
      { message: 'Account created successfully', user: { id: user._id, name: user.name, email: user.email, username: user.username } },
      { status: 201 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
