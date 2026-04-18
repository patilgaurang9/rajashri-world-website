export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// Check admin role via REST
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

  if (!profileRes.ok) {
    const errorText = await profileRes.text();
    console.error('Profile fetch failed:', errorText);
    return null;
  }
  const profiles = await profileRes.json();
  if (!Array.isArray(profiles) || profiles.length === 0) {
    console.error('No profile found for user:', authData.user.id);
    return null;
  }
  if (profiles[0].role !== 'admin') {
    console.error('User is not admin:', profiles[0].role);
    return null;
  }
  return { id: authData.user.id, email: authData.user.email };
}

// GET: List all tours
export async function GET(req: NextRequest) {
  const admin = await checkAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });

  const toursRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tours?select=*`,
    {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    }
  );

  if (!toursRes.ok) {
    const errorText = await toursRes.text();
    return NextResponse.json({ error: `Database error: ${errorText}` }, { status: 500 });
  }

  const tours = await toursRes.json();
  return NextResponse.json({ tours: Array.isArray(tours) ? tours : [] });
}

// POST: Create a new tour
export async function POST(req: NextRequest) {
  const admin = await checkAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const createRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tours`,
    {
      method: 'POST',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(body),
    }
  );

  if (!createRes.ok) {
    const err = await createRes.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const created = await createRes.json();
  return NextResponse.json({ tour: created[0] });
}

// PUT: Update a tour
export async function PUT(req: NextRequest) {
  const admin = await checkAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;

  const updateRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tours?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(updates),
    }
  );

  if (!updateRes.ok) {
    const err = await updateRes.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const updated = await updateRes.json();
  return NextResponse.json({ tour: updated[0] });
}

// DELETE: Remove a tour
export async function DELETE(req: NextRequest) {
  const admin = await checkAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const deleteRes = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tours?id=eq.${id}`,
    {
      method: 'DELETE',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    }
  );

  if (!deleteRes.ok) {
    const err = await deleteRes.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
