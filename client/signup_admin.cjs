require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function signUpAdmin() {
  console.log('Attempting to sign up admin in Supabase Auth...');
  const { data, error } = await supabase.auth.signUp({
    email: 'Panoraexport@admin.com',
    password: 'RishabhPanora@2025',
  });

  if (error) {
    console.error('Error signing up admin:', error.message);
  } else {
    console.log('Successfully signed up admin in Supabase Auth!', data.user.id);
  }
}

signUpAdmin();
