const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '..', '..', '..', 'Desktop', 'raj-websote', 'rajashri-world-website', 'tours-travel-website-3', '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { count: tourCount } = await supabase.from('tours').select('*', { count: 'exact', head: true });
  const { count: reviewCount } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
  
  console.log('Tours in DB:', tourCount);
  console.log('Reviews in DB:', reviewCount);
}

test();
