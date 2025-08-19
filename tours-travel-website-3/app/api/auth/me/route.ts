import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// This endpoint checks if the user is authenticated by verifying the JWT with Supabase.
export async function GET(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  let response;
  if (!token) {
    response = NextResponse.json({ authenticated: false }, { status: 401 });
  } else {
    // Verify the JWT with Supabase
    const { data, error } = await supabaseServer.auth.getUser(token);
    if (error || !data?.user) {
      response = NextResponse.json({ authenticated: false }, { status: 401 });
    } else {
      response = NextResponse.json({ authenticated: true, email: data.user.email });
    }
  }
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
