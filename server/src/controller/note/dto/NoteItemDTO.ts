import { ApiProperty } from "@nestjs/swagger";

export class NoteItemDTO{
    @ApiProperty()
    id: number;
    @ApiProperty()
    type: "note"|"directory";
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
}