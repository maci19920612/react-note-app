import {ApiProperty} from "@nestjs/swagger";

export class ErrorDTO {
    @ApiProperty()
    code: number;
    @ApiProperty()
    reason: string;
    @ApiProperty({
        nullable: true,
        description: "This property is used when the BE is in debug mode"
    })
    stacktrace: string;
}