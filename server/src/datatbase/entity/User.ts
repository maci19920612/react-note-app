import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserToken } from "./UserToken";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @OneToMany(() => UserToken, (token) => token.user)
    userTokens: UserToken[]
}