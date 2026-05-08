import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://takkoosggyockvgawvjr.supabase.co/rest/v1/'
const supabaseKey = 'sb_publishable_QB769xHsGisoXBH2JFCJzA_7i-gT11C'

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)