const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://nudkecpepnkzvbalsibz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZGtlY3BlcG5renZiYWxzaWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NTIxODMsImV4cCI6MjEwMzIyODE4M30.AaZV3beeE5eEoMl4nSKimCQAeWStBM7S0KfohMGECNM');

async function test() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'tharunkarthikav21@gmail.com',
    password: '123456'
  });
  
  if (authError) {
    console.log('Login error:', authError);
    return;
  }
  
  const { data, error } = await supabase.from('properties').select('*');
  console.log('Total properties:', data ? data.length : 0);
  if (data) {
    data.forEach(p => console.log(`- ${p.title} (${p.status})`));
  }
}
test();
