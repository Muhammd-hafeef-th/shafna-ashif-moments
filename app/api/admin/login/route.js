import { NextResponse } from 'next/server';

const ADMIN_EMAIL = 'adminwedding@gmail.com';
const ADMIN_PASSWORD = 'admin@0618.';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (
      email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD
    ) {
      // Create session response
      const token = Buffer.from(`${ADMIN_EMAIL}:${Date.now()}`).toString('base64');
      const response = NextResponse.json(
        { success: true, message: 'Logged in successfully', token },
        { status: 200 }
      );

      // Set cookie for session persistence
      response.cookies.set('admin_token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

