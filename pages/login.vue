<template>
    <div class="w-full max-w-2xl prose h-9">
        <h1>Log in to {{ title }}</h1>
        <button class="px-4 py-2 font-bold text-white bg-blue-500 rounded" @click="login">
            Log in with Github123
        </button>
    </div>
</template>

<script setup lang="ts">
const { title } = useCourse();
const supabase = useSupabaseClient();

// navigateTo('http://localhost:3000/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3', { external: true })

const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
    });
    console.log('data---', data)

    if (error) {
        console.error(error);
    }
};
</script>