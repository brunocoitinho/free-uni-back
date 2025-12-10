import type { CourseCreate } from "./models/course.model.js";
interface ListCoursesParams {
    searchTerm?: string;
    title?: string;
    field?: string;
}
export declare class DatabasePostgres {
    listCourses(params?: ListCoursesParams): Promise<Record<string, any>[] | undefined>;
    createCourse(course: CourseCreate): Promise<void>;
    getCourse(id: string): Promise<Record<string, any> | undefined>;
    updateCourse(id: string, title: string, field?: string): Promise<Record<string, any>[] | undefined>;
    deleteCourse(id: string): Promise<void>;
}
export {};
//# sourceMappingURL=database-postgres.d.ts.map