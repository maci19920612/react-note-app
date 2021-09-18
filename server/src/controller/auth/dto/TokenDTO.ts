import {ApiProperty} from "@nestjs/swagger";

export class TokenDTO{
    @ApiProperty()
    accessToken: string;
    @ApiProperty()
    refreshToken: string;
}

export class AccessTokenDTO{
    @ApiProperty()
    accessToken: string;
}

export class RefreshTokenDTO{
    @ApiProperty()
    refreshToken: string;
}