import { supabaseServer } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const showAll = searchParams.get("all") === "true";

  let query = supabaseServer
    .from("pop_reels")
    .select("*")
    .order("created_at", { ascending: false });

  if (!showAll) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PATCH(req: Request) {
  const { id, is_active } = await req.json();

  if (is_active) {
    // Deactivate all others first
    await supabaseServer
      .from("pop_reels")
      .update({ is_active: false })
      .neq("id", id);
  }

  const { data, error } = await supabaseServer
    .from("pop_reels")
    .update({ is_active })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { title, video_url } = await req.json();

  if (!title || !video_url) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // New reels are inactive by default
  const { data, error } = await supabaseServer
    .from("pop_reels")
    .insert([{ title, video_url, is_active: false }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
