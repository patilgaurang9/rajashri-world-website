export const dynamic = "force-dynamic";
export const revalidate = 0;
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
  // Set all no-cache headers
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}
