import { randomUUID } from "crypto";
import { sql } from "./db.js";
import type { CourseCreate } from "./models/course.model.js";

interface ListCoursesParams {
  searchTerm?: string;
  title?: string;
  field?: string;
}

export class DatabasePostgres {



    // Courses
    async listCourses(params: ListCoursesParams = {}) {
        const { searchTerm, title, field } = params;
        let courses;

        if (searchTerm) {
            courses = await sql`SELECT * FROM courses WHERE title ILIKE ${'%' + searchTerm + '%'} OR field ILIKE ${'%' + searchTerm + '%'} ORDER BY id`;
        } 

        if (title) {
            courses = await sql`SELECT * FROM courses WHERE title ILIKE ${'%' + title + '%'} ORDER BY id`;
        }

        if (field) {
            courses = await sql`SELECT * FROM courses WHERE field ILIKE ${'%' + field + '%'} ORDER BY id`;
        }

        if (!searchTerm && !title && !field){
            courses = await sql`SELECT * FROM courses ORDER BY id`;
        }
        return courses;
    }

    async createCourse(course: CourseCreate): Promise<void> {
        const id = randomUUID();
        const { title, field } = course;
        await sql`INSERT INTO courses (id, title, field) VALUES (${id}, ${title}, ${field})`;
    }
    
    async getCourse(id: string) {
        const result = await sql`SELECT * FROM courses WHERE id = ${id}`;
        return result[0];
    }
    async updateCourse(id: string, title: string, field?: string) {
        if (!field) {
            return await sql`UPDATE courses SET title = ${title} WHERE id = ${id}`;
        }
        await sql`UPDATE courses SET title = ${title}, field = ${field} WHERE id = ${id}`;
    }
    async deleteCourse(id: string) {
        await sql`DELETE FROM courses WHERE id = ${id}`;
    }

}