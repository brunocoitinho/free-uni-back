export type ResourceType = 'video' | 'article' | 'file' | 'link';
export interface Resource {
    id: string;
    lesson_id: number;
    title: string;
    url: string;
    type: ResourceType;
    position: number;
}
//# sourceMappingURL=resource.model.d.ts.map