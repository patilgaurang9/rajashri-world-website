import { NextResponse } from 'next/server';

export async function POST() {
  // Remove the cookie with all the same options as when it was set
  const res = NextResponse.json({ ok: true });
  res.cookies.set('sb-access-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
