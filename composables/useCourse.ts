import {
    Lesson,
    LessonWithPath,
    Chapter,
    Course,
} from '~/types/course';

import courseData from './courseData';


export const useCourse = (): Course => {
    const chapters: Chapter[] = courseData.chapters.map(
        (chapter) => {
            const lessons: Lesson[] = chapter.lessons.map(
                (lesson) => ({
                    ...lesson,
                    path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
                })
            );
            return {
                ...chapter,
                lessons,
            };
        }
    );
    return {
        ...courseData,
        chapters,
    };
};