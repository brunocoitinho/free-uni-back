

//Crie o tipo Course
export interface CourseCreate {
    title: string;
    field?: string | undefined;
}

export interface Course extends CourseCreate {
    id: string;
}