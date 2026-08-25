const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://nudkecpepnkzvbalsibz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZGtlY3BlcG5renZiYWxzaWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NTIxODMsImV4cCI6MjEwMzIyODE4M30.AaZV3beeE5eEoMl4nSKimCQAeWStBM7S0KfohMGECNM');

async function test() {
  const { data, error } = await supabase.from('properties').select('*').limit(1);
  if (data && data.length > 0) {
    console.log(Object.keys(data[0]));
  } else {
    console.log('No data or error:', error);
  }
}
test();
