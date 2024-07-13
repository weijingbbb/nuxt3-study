
// 全局历史记录中间件
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('全局中间件-----',to.path);
})