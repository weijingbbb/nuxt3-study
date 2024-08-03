import { defineStore } from 'pinia';

export const useCourseProgress = defineStore(
    'courseProgress',
    () => {
        // 初始化一个本地数据
        // const progress = useLocalStorage(
        //     'progress',
        //     {}
        // );
        const progress = ref<any>({});
        const initialized = ref(false);

        async function initialize() {
            // If the course has already been initialized, return
            if (initialized.value) return;
            initialized.value = true;

            // TODO: Fetch user progress from endpoint (lesson 6-5)
        }

        const toggleComplete = async (
            chapter: string,
            lesson: string
        ) => {
            // If there's no user we can't update the progress
            const user = useSupabaseUser();
            if (!user.value) return;

            // Grab chapter and lesson slugs from the route if they're not provided
            if (!chapter || !lesson) {
                const {
                    params: { chapterSlug, lessonSlug },
                } = useRoute();
                chapter = chapterSlug as string;
                lesson = lessonSlug as string;
            }

            const p = progress.value as any

            // Get the current progress for the lesson
            const currentProgress =
                p[chapter]?.[lesson];

            // Optimistically update the progress value in the UI
            p[chapter] = {
                ...p[chapter],
                [lesson]: !currentProgress
            }

            // Update the progress in the DB
            try {
                await $fetch(
                    `/api/course/chapter/${chapter}/lesson/${lesson}/progress`,
                    {
                        method: 'POST',
                        // Automatically stringified by ofetch
                        body: {
                            completed: !currentProgress,
                        },
                    }
                );
            } catch (error) {
                console.error(error);

                // If the request failed, revert the progress value
                progress.value[chapter] = {
                    ...progress.value[chapter],
                    [lesson]: currentProgress,
                };
            }
        }


        return {
            initialize,
            progress,
            toggleComplete
        }
    });