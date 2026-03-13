import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qzixmcsgqhkhvhtlbopv.supabase.co'
const supabaseKey = 'sb_publishable_VqKcP3QZFVjIXpgkVFdtDg_eVQ6Zncg' // This is the public key, probably won't work for deletes
// Wait, I need the service role key for deletes from outside or bypass RLS.
// But I don't have it.

async function clear() {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // delete all

    if (error) console.error(error)
    else console.log('Cleared products')
}

clear()
