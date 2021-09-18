import {Injectable} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";
import {Config} from "../Config";
import {User} from "../datatbase/entity/User";
import {v4 as uuid} from "uuid";
import {AccessToken} from "./AuthService";

export type AccessTokenPayload = {
    id: number;
    email: string;
    tokenUUID: string;
} & JwtPayload;

export type RefreshTokenPayload = {
    id: number;
    tokenUUID: string;
} & JwtPayload;

@Injectable()
export class JwtService {
    constructor(
        private config: Config
    ) {
    }

    signAccessToken(user: User): string {
        let targetJwtConfig = this.config.jwt.accessToken;
        let {id, email} = user;
        let tokenUUID = uuid();
        return jwt.sign({
            id, email, tokenUUID
        }, targetJwtConfig.secret, {
            expiresIn: targetJwtConfig.expiration,
            issuer: "note.maci.team",
            algorithm: "HS256"
        });
    }

    signRefreshToken(user: User): string {
        let targetJwtToken = this.config.jwt.refreshToken;
        let {id} = user;
        let tokenUUID = uuid();
        return jwt.sign({
            id, tokenUUID
        }, targetJwtToken.secret, {
            expiresIn: targetJwtToken.expiration,
            algorithm: "HS256"
        });
    }

    validateAccessToken(accessToken: string): AccessTokenPayload {
        let targetJwtTokenConfig = this.config.jwt.accessToken;
        return <AccessTokenPayload>jwt.verify(accessToken, targetJwtTokenConfig.secret, {
            algorithms: ["HS256"]
        })
    }

    validateRefreshToken(refreshToken: string): RefreshTokenPayload {
        let targetJwtTokenConfig = this.config.jwt.refreshToken;
        return <RefreshTokenPayload>jwt.verify(refreshToken, targetJwtTokenConfig.secret, {
            algorithms: ["HS256"]
        });
    }
}
