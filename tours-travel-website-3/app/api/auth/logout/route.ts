import { NextResponse } from 'next/server';

export async function POST() {
  // Remove the cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set('sb-access-token', '', { maxAge: 0, path: '/' });
  return res;
}
