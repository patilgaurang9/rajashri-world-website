export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// Returns admin dashboard stats (counts of tours, enquiries, custom bookings)
// Only accessible to admin users
export async function GET(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify JWT
  const { data: authData, error: authError } = await supabaseServer.auth.getUser(token);
  if (authError || !authData?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check admin role
  const { data: profile } = await supabaseServer
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Fetch counts
  const [toursRes, enquiriesRes, customBookingsRes] = await Promise.all([
    supabaseServer.from('tours').select('id', { count: 'exact', head: true }),
    supabaseServer.from('enquiries').select('id', { count: 'exact', head: true }),
    supabaseServer.from('custom_tour_requests').select('id', { count: 'exact', head: true }),
  ]);

  return NextResponse.json({
    totalTours: toursRes.count || 0,
    totalEnquiries: enquiriesRes.count || 0,
    totalCustomBookings: customBookingsRes.count || 0,
  });
}
