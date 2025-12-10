
export type ResourceType = 'video' | 'article' | 'file' | 'link';

export interface Resource {
    id: string;
    lesson_id: number;
    title: string;
    url: string;
    type: ResourceType; // O TS vai te impedir de errar o tipo aqui também
    position: number;
}