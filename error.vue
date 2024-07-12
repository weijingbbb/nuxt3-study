<template>
    <NuxtLayout>
        <div class="prose">
            <h1>应用错误，很抱歉☹️。</h1>
            <p>错误代码：{{ error?.statusCode }}</p>
            <p>错误链接：{{ error?.url }}</p>
            <p>错误信息：{{ error?.message }}</p>
            <p>返回<a class="hover:cursor-pointer hover:text-blue-600" @click="handleError">第一章节</a></p>
        </div>
    </NuxtLayout>
</template>

<script setup>
const error = useError();

const handleError = () => {
    // Nuxt 自带的清除错误方法
    clearError({
        redirect: '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3'
    })
}
</script>