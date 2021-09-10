import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class NoteDirectory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToOne(() => NoteDirectory)
    parentDirectory: NoteDirectory;
    @ManyToOne(() => User)
    user: User;
}