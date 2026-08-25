const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://nudkecpepnkzvbalsibz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZGtlY3BlcG5renZiYWxzaWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NTIxODMsImV4cCI6MjEwMzIyODE4M30.AaZV3beeE5eEoMl4nSKimCQAeWStBM7S0KfohMGECNM');

async function test() {
  const { data, error } = await supabase.from('properties').insert([{
    title: 'test',
    price: '100',
    currency: 'AED',
    type: 'Apartment',
    bedrooms: '1',
    bathrooms: '1',
    size: '100',
    location: 'test',
    description: 'test',
    developer: 'test',
    amenities: 'test',
    user_id: '12345678-1234-1234-1234-123456789012',
    status: 'Pending Approval',
    images: [],
    video_url: ''
  }]);
  console.log('Error:', error);
}
test();
