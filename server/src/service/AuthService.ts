import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../datatbase/entity/User";
import { UserToken } from "src/datatbase/entity/UserToken";
import { PasswordUtils } from "src/util/PasswordUtils";
import { v4 as uuid } from "uuid"

export interface Token {
    token: string
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

export class InvalidToken extends Error { };

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserToken) private userTokenRepository: Repository<UserToken>,
        private passwordUtils: PasswordUtils
    ) { }

    async login(email: string, password: string): Promise<Token> {
        let targetUser = await this.userRepository.findOne({
            where: { email }
        });

        if (!targetUser) {
            throw new UserNotFound(email);
        }

        if (this.passwordUtils.hash(password) != targetUser.password) {
            throw new InvalidCredentials(email);
        }
        let token = uuid()
        console.log("Generaeted token: ", token);
        let userToken = this.userTokenRepository.create({
            user: targetUser,
            token,
            createdAt: new Date().toString(),
            lastUsage: new Date().toString()
        });
        await this.userTokenRepository.save(userToken);
        return <Token>{ token };
    }

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

    async validate(token: string): Promise<boolean> {
        let targetUserToken = await this.userTokenRepository.findOne({
            where: {
                token
            }
        });

        if (!targetUserToken) {
            return false
        }

        targetUserToken.lastUsage = new Date().toString();

        await this.userTokenRepository.save(targetUserToken);
        return true
    }
}