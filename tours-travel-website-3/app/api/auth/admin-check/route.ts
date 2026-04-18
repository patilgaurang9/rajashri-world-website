export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// Verifies that the current user is authenticated AND has admin role
export async function GET(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;

  if (!token) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  // Verify JWT
  const { data, error } = await supabaseServer.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  // Check role in profiles table
  const { data: profile } = await supabaseServer
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ isAdmin: false }, { status: 403 });
  }

  return NextResponse.json({ isAdmin: true, email: data.user.email });
}
