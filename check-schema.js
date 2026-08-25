const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://nudkecpepnkzvbalsibz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZGtlY3BlcG5renZiYWxzaWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NTIxODMsImV4cCI6MjEwMzIyODE4M30.AaZV3beeE5eEoMl4nSKimCQAeWStBM7S0KfohMGECNM');

async function check() {
  // Query using RPC or try to insert a dummy and see the error?
  // We don't have the service role key. 
  // Let's just login as the user.
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'tharunkarthikav21@gmail.com',
    password: '123456'
  });
  if (authError) {
    console.log('Login failed:', authError.message);
  } else {
    // If we have Admin Full Access, we can select 1 row and print keys.
    const { data, error } = await supabase.from('properties').select('*').limit(1);
    if (data && data.length > 0) {
      console.log('Columns:', Object.keys(data[0]));
    } else {
      console.log('No data or error:', error);
    }
  }
}
check();
