export type JwtTokenConfig = {
    expiration: string;
    secret: string;
}

export class Config {
    secret: string;
    jwt: {
        accessToken: JwtTokenConfig,
        refreshToken: JwtTokenConfig
    }
}