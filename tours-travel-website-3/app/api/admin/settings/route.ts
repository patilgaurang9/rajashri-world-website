export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

async function checkAdmin(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  if (!token) return null;

  const { data: authData, error: authError } = await supabaseServer.auth.getUser(token);
  if (authError || !authData?.user) return null;

  const profileRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?id=eq.${authData.user.id}&select=role`,
    {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    }
  );
  const profiles = await profileRes.json();
  if (!Array.isArray(profiles) || profiles.length === 0 || profiles[0].role !== 'admin') {
    return null;
  }
  return { id: authData.user.id, email: authData.user.email };
}

export async function GET(req: NextRequest) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/company_settings?id=eq.1&select=*`,
    {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    }
  );
  const data = await res.json();
  return NextResponse.json({ settings: data && data.length > 0 ? data[0] : null });
}

export async function PUT(req: NextRequest) {
  const admin = await checkAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  
  // Upsert the settings row (id=1)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/company_settings`,
    {
      method: 'POST', // Using POST with upsert resolution
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify({ id: 1, ...body, updated_at: new Date().toISOString() }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json({ error }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json({ settings: data[0] });
}
