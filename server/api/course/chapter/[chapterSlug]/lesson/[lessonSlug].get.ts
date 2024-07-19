import course from '~/server/courseData';

export default defineEventHandler((event) => {
    const { chapterSlug, lessonSlug } = event.context.params as any;

    const chapter = course.chapters.find(
        (chapter: any) => chapter.slug === chapterSlug
    );

    if (!chapter) {
        throw createError({
            statusCode: 404,
            message: 'Chapter not found',
        });
    }

    const lesson = chapter.lessons.find(
        (lesson: any) => lesson.slug === lessonSlug
    );

    if (!lesson) {
        throw createError({
            statusCode: 404,
            message: 'Lesson not found',
        });
    }

    return lesson;
});