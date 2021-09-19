import { User } from "./User";
import { NoteDirectory } from "./NoteDirectory";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;
    @ManyToOne(() => User)
    user: User;
    @ManyToOne(() => NoteDirectory, {
        onDelete: "CASCADE"
    })
    parentDirectory: NoteDirectory;
}