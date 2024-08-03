// import { createClient } from '@supabase/supabase-js';

import { serverSupabaseUser } from '#supabase/server';


// const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string)


export default defineEventHandler(async (event) => {

    // const { data: { user } } = await supabase.auth.getUser()
    const user = await serverSupabaseUser(event);
    console.log('api/middleware----user:', user.email)
    event.context.user = user;
});