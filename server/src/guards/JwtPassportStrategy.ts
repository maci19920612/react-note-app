import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy, VerifiedCallback} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {AccessTokenPayload} from "../service/JwtService";
import {Config} from "../Config";
import {AuthService} from "../service/AuthService";

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {

    constructor(
        private config: Config,
        private authService: AuthService
    ) {
        super({
            secretOrKey: config.jwt.accessToken.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jsonWebTokenOptions: {
                algorithms: ["HS256"]
            }
        }, (payload: AccessTokenPayload, callback: VerifiedCallback) => {
            console.log(payload);
            this.authService.getUserById(payload.id)
                .then(user => {
                    if (user) {
                        callback(null, user);
                    } else {
                        callback("User not found with this id: " + payload.id)
                    }
                })
                .catch(error => {
                    callback(error);
                })
        })
    }
}