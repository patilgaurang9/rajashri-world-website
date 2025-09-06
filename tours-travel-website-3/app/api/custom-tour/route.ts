import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, destinations, start_date, duration, budget, accommodation, travelers, additional_requirements } = body;

  const { data, error } = await supabase
    .from('custom_tours')
    .insert([
      {
        name,
        email,
        destinations,
        start_date,
        duration,
        budget,
        accommodation,
        travelers,
        additional_requirements,
        // activities: body.activities, // Uncomment if you add activities back
      }
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true, data });
}
