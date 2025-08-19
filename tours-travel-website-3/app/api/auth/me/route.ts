import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// This endpoint checks if the user is authenticated by verifying the JWT with Supabase.
export async function GET(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  // Verify the JWT with Supabase
  const { data, error } = await supabaseServer.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  // Optionally, return user info (e.g., email) for UI
  return NextResponse.json({ authenticated: true, email: data.user.email });
}
