<template>
    <div v-if="user" class="flex items-center p-3 space-x-3 bg-white rounded">
        <img class="w-12 h-12 border-2 border-blue-400 rounded-full" :src="profile" />
        <div class="text-right">
            <div class="font-medium">{{ name }}</div>
            <button class="text-sm underline text-slate-500" @click="logout">
                Log out
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();
const logout = async () => {
    const { error } = await auth.signOut();
    if (error) {
        console.error(error);
        return;
    }
    // The Nuxt Supabase auth *should* be doing this
    // for us, but it isn't for some reason.
    try {
        await $fetch('/api/_supabase/session', {
            method: 'POST',
            body: { event: 'SIGNED_OUT', session: null },
        });
        user.value = null;
    } catch (e) {
        console.error(error);
    }
    await navigateTo('/login');
};
const name = computed(
    () => user.value?.user_metadata.full_name
);
const profile = computed(
    () => user?.value.user_metadata.avatar_url
);
</script>