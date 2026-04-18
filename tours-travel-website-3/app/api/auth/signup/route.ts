import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from '@/lib/supabase-server';
import { z } from 'zod';
import { upsertProfile } from '@/lib/profiles';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
  phone: z.string().min(7),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, fullName, phone } = schema.parse(body);

    // Use service role client ONLY for admin.createUser (doesn't corrupt auth state)
    const { data, error } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      user_metadata: { fullName },
      email_confirm: true,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    // Use a FRESH client for signInWithPassword to avoid corrupting the singleton
    const supabaseFresh = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: signInData, error: signInError } = await supabaseFresh.auth.signInWithPassword({ email, password });
    if (signInError) return NextResponse.json({ error: signInError.message }, { status: 400 });

    // Upsert user profile in 'profiles' table
    if (signInData.user) {
      const { error: profileError } = await upsertProfile({
        id: signInData.user.id,
        email,
        fullName,
        phone,
      });
      if (profileError) {
        console.error('Profile upsert error:', profileError.message);
        return NextResponse.json({ error: 'Profile creation failed: ' + profileError.message }, { status: 500 });
      }
    }

    // Set JWT in HTTP-only cookie
    const res = NextResponse.json({ user: signInData.user });
    res.cookies.set('sb-access-token', signInData.session?.access_token || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
