import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
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
    
    @OneToMany(() => NoteDirectory, (note) => note.parentDirectory, {
        cascade: true
    })
    childDirectories: NoteDirectory[];
}