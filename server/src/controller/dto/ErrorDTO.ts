import { ApiProperty } from "@nestjs/swagger";

export class ErrorDTO{
    @ApiProperty()
    description: string;
}