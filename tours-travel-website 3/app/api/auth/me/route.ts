import { NextRequest, NextResponse } from 'next/server';

// This endpoint checks if the user is authenticated by verifying the presence of the JWT cookie.
export async function GET(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  // Optionally, you could verify the JWT here with Supabase if you want to check expiration, etc.
  return NextResponse.json({ authenticated: true });
}
