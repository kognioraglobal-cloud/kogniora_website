import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    'Missing Supabase environment variables.\n' +
    'Copy .env.local.example to .env.local and fill in your values.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnon);

// ─── Data fetchers (used in server components) ────────────────

/** All active courses, ordered by sort_order then name */
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('id,name,slug,category,icon_abbr,tags,duration_days,level,short_description,sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('name',       { ascending: true });
  if (error) { console.error('getCourses:', error.message); return []; }
  return data ?? [];
}

/** Min prices per course (for course cards) */
export async function getMinPrices() {
  const { data, error } = await supabase
    .from('course_pricing')
    .select('course_id, price_usd')
    .eq('is_active', true)
    .order('price_usd', { ascending: true });
  if (error) { console.error('getMinPrices:', error.message); return {}; }
  // Build a map: course_id → min_price_usd
  const map = {};
  (data ?? []).forEach(row => {
    if (!map[row.course_id]) map[row.course_id] = row.price_usd;
  });
  return map;
}

/** Next upcoming dates per course (for course cards) */
export async function getNextDates() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('date_groups')
    .select('course_id, start_date, month_label')
    .eq('is_active', true)
    .gte('start_date', today)
    .order('start_date', { ascending: true });
  if (error) { console.error('getNextDates:', error.message); return {}; }
  const map = {};
  (data ?? []).forEach(row => {
    if (!map[row.course_id]) {
      map[row.course_id] = row.month_label ||
        new Date(row.start_date + 'T00:00:00').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    }
  });
  return map;
}

/** Full course detail by slug */
export async function getCourseBySlug(slug) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error) { console.error('getCourseBySlug:', error.message); return null; }
  return data;
}

/** All slugs (for generateStaticParams) */
export async function getAllSlugs() {
  const { data, error } = await supabase
    .from('courses')
    .select('slug')
    .eq('is_active', true);
  if (error) { console.error('getAllSlugs:', error.message); return []; }
  return (data ?? []).map(r => r.slug);
}

/** Pricing tiers for a course */
export async function getPricing(courseId) {
  const { data, error } = await supabase
    .from('course_pricing')
    .select('tier_name,price_usd,conditions,sort_order,is_active')
    .eq('course_id', courseId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) { console.error('getPricing:', error.message); return []; }
  return data ?? [];
}

/** All city+date+eventbrite data for a course (from the view) */
export async function getCourseEvents(slug) {
  const { data, error } = await supabase
    .from('v_course_city_events')
    .select('*')
    .eq('course_slug', slug)
    .order('city', { ascending: true });
  if (error) { console.error('getCourseEvents:', error.message); return []; }
  return data ?? [];
}

/** All date groups for a course, with cities */
export async function getDateGroupsForCourse(courseId) {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('date_groups')
    .select('id,group_name,start_date,end_date,month_label, date_group_cities(city_id)')
    .eq('course_id', courseId)
    .eq('is_active', true)
    .gte('start_date', today)
    .order('start_date', { ascending: true });
  if (error) { console.error('getDateGroupsForCourse:', error.message); return []; }
  return data ?? [];
}
