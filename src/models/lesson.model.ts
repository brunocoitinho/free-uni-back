// Tipo lesson
export interface LessonCreate {
    title: string;
    description: string;
    course_id: string;
}

export interface Lesson extends LessonCreate {
    id: string;
    position: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

