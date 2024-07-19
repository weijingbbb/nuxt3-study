export default defineNuxtRouteMiddleware((to, from) => {

    const user = useSupabaseUser();

    console.log('--------',to.params.chapterSlug)
    if (
        user.value ||
        to.params.chapterSlug === '1-chapter-1'
    ) {
        return;
    }

    return navigateTo(`/login?redirectTo=${to.path}`);
});