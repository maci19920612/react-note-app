import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../datatbase/entity/User";
import {UserToken} from "src/datatbase/entity/UserToken";
import {PasswordUtils} from "src/util/PasswordUtils";
import {v4 as uuid} from "uuid"
import jwt from "jsonwebtoken";
import {JwtService} from "./JwtService";

export interface AccessToken {
    accessToken: string;
}

export interface RefreshToken extends AccessToken {
    refreshToken: string;
}

export class UserNotFound extends Error {
    constructor(
        public email: string
    ) {
        super();
    }
}

export class InvalidCredentials extends Error {
    constructor(
        public email: string
    ) {
        super();
    }
}

export class EmailAlreadyExists extends Error {
    constructor(
        public email: string
    ) {
        super();
    }
}

export class InvalidToken extends Error {
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserToken) private userTokenRepository: Repository<UserToken>,
        private passwordUtils: PasswordUtils,
        private jwtService: JwtService
    ) {
    }

    /**
     * @param user: The users which is authenticated by the local passport strategy
     * @return Newly created token for the references user, it only returns with this when the login was successful.
     * @throws UserNotFound this is thrown when the email is not found in our database
     * @throws InvalidCredentials this is thrown when the password is invalid
     */
    async login(user: User): Promise<RefreshToken> {
        let refreshToken = this.jwtService.signRefreshToken(user);
        let accessToken = this.jwtService.signAccessToken(user);
        let userToken = this.userTokenRepository.create({
            user: user,
            refreshToken,
            accessToken,
            createdAt: new Date().toString(),
            lastUsage: new Date().toString()
        });
        await this.userTokenRepository.save(userToken);
        return {
            refreshToken,
            accessToken
        };
    }

    /**
     * This function will create, validate and save a new user into the database
     * @param email The new user's email address
     * @param password The hew user's password
     * @returns void
     */
    async register(email: string, password: string) {
        let targetUser = await this.userRepository.findOne({
            where: {
                email
            }
        });

        if (targetUser) {
            throw new EmailAlreadyExists(email);
        }

        let hashedPassword = this.passwordUtils.hash(password);
        let user = this.userRepository.create({
            email,
            password: hashedPassword
        });
        await this.userRepository.save(user);
    }


    async validateAccessToken(token: string): Promise<boolean> {
        let targetUserToken = await this.userTokenRepository.findOne({
            where: {
                accessToken: token
            }
        });

        if (!targetUserToken) {
            return false
        }

        targetUserToken.lastUsage = new Date().toString();

        await this.userTokenRepository.save(targetUserToken);
        return true
    }


    /**
     * This function is used by the LocalPassportStrategy and it's used it to create a user object if it exists and the provided passport is correct
     * @param email Target user's email address
     * @param password Target user's password
     * @returns User if it exists and the password is valid or null of either of those statements is false
     */
    async validateUser(email: string, password: string): Promise<User | null> {
        let hashedPassword = this.passwordUtils.hash(password);
        let targetUser = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if (!targetUser || targetUser.password !== password && targetUser.password !== hashedPassword) {
            return null;
        }
        return targetUser;
    }

    async getUserById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                id
            }
        });
    }

    async refreshToken(refreshToken: string): Promise<string> {
        try {
            this.jwtService.validateRefreshToken(refreshToken)
        } catch (ex) {
            console.error("Invalid refresh token provided");
            throw new Error("Invalid or expired refresh token provided!");
        }
        let userToken = await this.userTokenRepository.findOne({
            where: {
                refreshToken
            },
            relations: ["user"]
        });

        if (!userToken) {
            console.error(`Revoked refresh token: ${refreshToken}`);
            throw new Error("This refreshToken was revoked");
        }
        let targetUser = userToken.user;
        let newAccessToken = this.jwtService.signAccessToken(targetUser);
        userToken.accessToken = newAccessToken;
        await this.userTokenRepository.save(userToken);
        return newAccessToken;
    }

    async logout(accessToken: string) {
        let targetUserToken = await this.userTokenRepository.findOne({
            where: {
                accessToken
            }
        });

        if(!targetUserToken){
            return;
        }

        await this.userTokenRepository.remove(targetUserToken);
    }
}


