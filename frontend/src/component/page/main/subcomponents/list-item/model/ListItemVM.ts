export type ListItemVM = {
    type: "note"|"directory"|"parent";
    name: string;
    content?: string; 
    createdAt: string;
};