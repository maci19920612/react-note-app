import { User } from "./User";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserToken {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User)
    user: User;
    @Column()
    token: string;
    @Column()
    createdAt: string;
    @Column()
    lastUsage: string;
}