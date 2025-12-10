import { sql } from "./db.js";
export async function createTable() {
    await sql `
DROP TABLE IF EXISTS resources;`
        .then(() => {
        console.log("Resources table dropped successfully.");
    })
        .catch((error) => {
        console.error("Error dropping Resources table:", error);
    });
    await sql `
DROP TABLE IF EXISTS lessons;`
        .then(() => {
        console.log("Lessons table dropped successfully.");
    })
        .catch((error) => {
        console.error("Error dropping Lessons table:", error);
    });
    await sql `
DROP TABLE IF EXISTS courses;`
        .then(() => {
        console.log("Courses table dropped successfully.");
    })
        .catch((error) => {
        console.error("Error dropping Courses table:", error);
    });
    await sql `
DROP TYPE IF EXISTS resource_type;`
        .then(() => {
        console.log("Resource_type type dropped successfully.");
    })
        .catch((error) => {
        console.error("Error dropping Resource_type type:", error);
    });
    await sql `
CREATE TABLE courses (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    field TEXT 
);`;
    await sql `
    CREATE TABLE lessons (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(id)
);`;
    await sql `
    CREATE TYPE resource_type AS ENUM ('video', 'article', 'file', 'link');`;
    await sql `
    CREATE TABLE resources (
    id TEXT PRIMARY KEY,
    lesson_id TEXT NOT NULL,                -- Vínculo com a aula
    title VARCHAR(255) NOT NULL,               -- Nome do link (ex: "Vídeo do YouTube")
    url TEXT NOT NULL,                         -- O link em si
    type resource_type NOT NULL,               -- Usa o ENUM criado acima
    position INTEGER DEFAULT 0,                -- Para ordenar (ex: vídeo primeiro, PDF depois)
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraint (Chave Estrangeira)
    CONSTRAINT fk_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE                      -- Se apagar a aula, apaga os recursos dela automaticamente
);`;
}
createTable()
    .then(() => {
    console.log("Tables created successfully.");
})
    .catch((error) => {
    console.error("Error creating tables:", error);
});
//# sourceMappingURL=create-table.js.map