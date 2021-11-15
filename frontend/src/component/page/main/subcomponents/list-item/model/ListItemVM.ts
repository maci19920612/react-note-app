export type ListItemVM = {
    id: number;
    type: "note"|"directory"|"parent";
    name: string;
    content?: string; 
    createdAt: string;
};