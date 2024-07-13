export default defineNuxtRouteMiddleware((to, from) => {

    console.log('局部路由中间件-----',to.path, to.params.chapterSlug);
    // if (to.params.chapterSlug !== '2-chapter-2') {
    //     return;
    // }
    // return navigateTo('/login');
});