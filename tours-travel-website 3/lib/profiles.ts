// Utility for inserting/updating user profile in Supabase 'profiles' table
// Use REST API for upsert with Authorization header for service role
export async function upsertProfile({ id, email, fullName, phone }: { id: string, email: string, fullName: string, phone: string }) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      id,
      email,
      full_name: fullName,
      phone,
    }),
  });
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // No JSON body (e.g. 204 No Content)
    data = null;
  }
  if (!res.ok) {
    return { error: { message: (data && data.message) || 'Profile upsert failed' } };
  }
  return { data };
}
