export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// This endpoint checks if the user is authenticated by verifying the JWT with Supabase.
// Also fetches the user's role from the profiles table.
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
      // Fetch user role from profiles table using service role key directly via REST
      // This avoids any issues with the supabaseServer client's auth state
      const profileRes = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?id=eq.${data.user.id}&select=role,full_name`,
        {
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          },
        }
      );
      const profiles = await profileRes.json();
      const profile = Array.isArray(profiles) && profiles.length > 0 ? profiles[0] : null;

      response = NextResponse.json({
        authenticated: true,
        email: data.user.email,
        role: profile?.role || 'user',
        fullName: profile?.full_name || '',
      });
    }
  }
  // Set all no-cache headers
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}
