import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
export class DatabasePostgres {
    // Courses
    async listCourses(params = {}) {
        const { searchTerm, title, field } = params;
        let courses;
        if (searchTerm) {
            courses = await sql `SELECT * FROM courses WHERE title ILIKE ${'%' + searchTerm + '%'} OR field ILIKE ${'%' + searchTerm + '%'} ORDER BY id`;
        }
        if (title) {
            courses = await sql `SELECT * FROM courses WHERE title ILIKE ${'%' + title + '%'} ORDER BY id`;
        }
        if (field) {
            courses = await sql `SELECT * FROM courses WHERE field ILIKE ${'%' + field + '%'} ORDER BY id`;
        }
        if (!searchTerm && !title && !field) {
            courses = await sql `SELECT * FROM courses ORDER BY id`;
        }
        return courses;
    }
    async createCourse(course) {
        const id = randomUUID();
        const { title, field } = course;
        await sql `INSERT INTO courses (id, title, field) VALUES (${id}, ${title}, ${field})`;
    }
    async getCourse(id) {
        const result = await sql `SELECT * FROM courses WHERE id = ${id}`;
        return result[0];
    }
    async updateCourse(id, title, field) {
        if (!field) {
            return await sql `UPDATE courses SET title = ${title} WHERE id = ${id}`;
        }
        await sql `UPDATE courses SET title = ${title}, field = ${field} WHERE id = ${id}`;
    }
    async deleteCourse(id) {
        await sql `DELETE FROM courses WHERE id = ${id}`;
    }
}
//# sourceMappingURL=database-postgres.js.map