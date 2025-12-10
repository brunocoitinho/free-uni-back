import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";
const server = fastify();
const database = new DatabasePostgres();
server.get("/courses", async (request, reply) => {
    const searchTerm = request.query.search;
    const titleSearch = request.query.title;
    const fieldSearch = request.query.field;
    if (searchTerm) {
        const courses = await database.listCourses({ searchTerm });
        return courses;
    }
    if (titleSearch) {
        const courses = await database.listCourses({ title: titleSearch });
        return courses;
    }
    if (fieldSearch) {
        const courses = await database.listCourses({ field: fieldSearch });
        return courses;
    }
    const courses = await database.listCourses();
    return courses;
});
server.get('/courses/:id', async (request, reply) => {
    const { id } = request.params;
    const course = await database.getCourse(id);
    if (!course) {
        return reply.status(404).send({ message: 'Course not found' });
    }
    return course;
});
server.post("/courses", async (request, reply) => {
    const { title, field } = request.body;
    await database.createCourse({ title, field });
    return reply.status(201).send();
});
server.put("/courses/:id", async (request, reply) => {
    const { id } = request.params;
    const { title, field } = request.body;
    if (!field) {
        await database.updateCourse(id, title);
    }
    await database.updateCourse(id, title, field);
    return reply.status(204).send();
});
server.delete("/courses/:id", async (request, reply) => {
    const { id } = request.params;
    await database.deleteCourse(id);
    return reply.status(204).send();
});
// server.get('/lessons', async (request, reply) => {
//     return {message: 'All lessons endpoint'};
// });
// server.post('/lessons', async (request, reply) => {})
// server.put('/lessons/:id', async (request, reply) => {})
// server.delete('/lessons/:id', async (request, reply) => {})
server.listen({
    port: parseInt(process.env.PORT || "3333"),
    host: "0.0.0.0",
});
//tipos de conteudos aceitos nas lições
//video
//article
//links
//file/pdf
//# sourceMappingURL=server.js.map