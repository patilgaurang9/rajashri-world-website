import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { minPrice, maxPrice, duration, startDate, endDate } = await req.json();
  let query = supabase.from('tours').select('*');

  if (minPrice !== undefined && maxPrice !== undefined) {
    query = query.gte('price_with_flight', minPrice).lte('price_with_flight', maxPrice);
  }
  if (duration) {
    if (duration === '1-3') query = query.gte('duration_days', 1).lte('duration_days', 3);
    if (duration === '4-7') query = query.gte('duration_days', 4).lte('duration_days', 7);
    if (duration === '8-14') query = query.gte('duration_days', 8).lte('duration_days', 14);
    if (duration === '15+') query = query.gte('duration_days', 15);
  }

  if (startDate && endDate) {
    // Include any tour that overlaps the selected date range.
    query = query.lte('start_date', endDate).gte('end_date', startDate);
  } else if (startDate) {
    query = query.gte('end_date', startDate);
  } else if (endDate) {
    query = query.lte('start_date', endDate);
  }

  const { data, error } = await query;
  return NextResponse.json({ data, error });
}
