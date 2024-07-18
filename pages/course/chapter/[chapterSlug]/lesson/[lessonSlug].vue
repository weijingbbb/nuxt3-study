<template>
    <div>
        <p class="mt-0 mb-1 font-bold uppercase text-slate-400">
            Lesson {{ chapter.number }} - {{ lesson.number }}
        </p>
        <h2 class="my-0">{{ lesson.title }}</h2>
        <div class="flex mt-2 mb-8 space-x-4">
            <NuxtLink v-if="lesson.sourceUrl" class="font-normal text-gray-500 text-md" :to="lesson.sourceUrl">
                Download Source Code
            </NuxtLink>
            <NuxtLink v-if="lesson.downloadUrl" class="font-normal text-gray-500 text-md" :to="lesson.downloadUrl">
                Download Video
            </NuxtLink>
        </div>
        <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
        <p>{{ lesson.text }}</p>
        <!-- <ClientOnly>
            <LessonCompleteButton :model-value="isLessonComplete" @update:model-value="toggleComplete" />
        </ClientOnly>    -->
        <LessonCompleteButton :model-value="isLessonComplete" @update:model-value="toggleComplete" />
    </div>
</template>

<script setup>
// if(route.params.lessonSlug === '3-typing-component-events'){
//     console.log(route.params.paramthatdoesnotexistwhoops.capitalizeIsNotAMethod());
// }

const course = useCourse();
const route = useRoute();


// 利用编译宏来做路由校验
definePageMeta({
    // 路由器中间件，用了validate，就不能再使用其他中间件了
    // validate({ params }) {
    // 只能访问里面的变量，外面的访问不到
    middleware: [
        function ({ params }, from) {
            const course = useCourse();

            const chapter = course.chapters.find(
                (chapter) => chapter.slug === params.chapterSlug
            );

            if (!chapter) {
                return abortNavigation(
                    createError({
                        statusCode: 404,
                        message: 'Chapter not found',
                    })
                );
            }

            const lesson = chapter.lessons.find(
                (lesson) => lesson.slug === params.lessonSlug
            );

            if (!lesson) {
                return abortNavigation(
                    createError({
                        statusCode: 404,
                        message: 'Lesson not found',
                    })
                );
            }
        },
        'auth',
    ]
});


const chapter = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.chapterSlug
    );
});

const lesson = computed(() => {
    return chapter.value.lessons.find(
        (lesson) => lesson.slug === route.params.lessonSlug
    );
});

const title = computed(() => {
    return `${lesson.value.title} - ${course.title}`;
});
useHead({
    title,
});

const progress = useLocalStorage('progress', []);

const isLessonComplete = computed(() => {
    if (!progress.value[chapter.value.number - 1]) {
        return false;
    }

    if (
        !progress.value[chapter.value.number - 1][
        lesson.value.number - 1
        ]
    ) {
        return false;
    }

    return progress.value[chapter.value.number - 1][
        lesson.value.number - 1
    ];
});

const toggleComplete = () => {
    if (!progress.value[chapter.value.number - 1]) {
        progress.value[chapter.value.number - 1] = [];
    }

    progress.value[chapter.value.number - 1][
        lesson.value.number - 1
    ] = !isLessonComplete.value;
};
</script>