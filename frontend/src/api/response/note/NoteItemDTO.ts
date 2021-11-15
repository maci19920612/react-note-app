export type NoteItemDTO = {
    id: number;
    type: "note"|"directory";
    title: string;
    content?: string;
}