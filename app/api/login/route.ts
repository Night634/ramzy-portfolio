import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const VALID_USER = 'admin@ramzy.dev';
    const VALID_PASS = 'admin123';

    if (username === VALID_USER && password === VALID_PASS) {
      const response = NextResponse.json({
        success: true,
        message: 'Login berhasil',
      });

      response.cookies.set('admin_token', 'authenticated_true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 Hari
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { message: 'Username atau password salah' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}