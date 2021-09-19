import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ignoreElements } from "rxjs";
import { Note } from "src/datatbase/entity/Note";
import { NoteDirectory } from "src/datatbase/entity/NoteDirectory";
import { User } from "src/datatbase/entity/User";
import { Repository, In } from "typeorm";

export class NoteNotFoundWithId extends Error {
    constructor(
        public id: number
    ) {
        super();
    }
}

export class NoteDirectoryNotFound extends Error {
    constructor(
        public id: number
    ) {
        super();
    }
}

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note) private noteRepository: Repository<Note>,
        @InjectRepository(NoteDirectory) private noteDirectoryRepository: Repository<NoteDirectory>
    ) { }

    async getNotesByDirectory(user: User, directory?: NoteDirectory): Promise<Array<Note>> {
        return await this.noteRepository.find({
            where: {
                user: {
                    id: user.id
                },
                parentDirectory: (directory ? {
                    id: directory.id
                } : null)
            },
            relations: ["user", "parentDirectory"]
        });
    }

    async getNoteById(user: User, id: number): Promise<Note | undefined> {
        return await this.noteRepository.findOne({
            where: {
                id,
                user: {
                    id: user.id
                }
            },
            relations: ["user", "parentRepository"]
        });
    }

    async createNote(user: User, title: string, content: string, parentDirectory?: NoteDirectory): Promise<Note> {
        let note = this.noteRepository.create({
            user,
            content,
            title,
            parentDirectory
        });
        return await this.noteRepository.save(note); //TODO: We should test that it will return the original note or it will query down from the database. It's important becuase in this point we don't have id for this newly created note.
    }

    async updateNote(user: User, id: number, title: string, content: string): Promise<Note> {
        let targetNote = await this.noteRepository.findOne({
            where: {
                id,
                user: {
                    id: user.id
                }
            },
            relations: ["user", "parentDirectory"]
        });

        if (!targetNote) {
            throw new NoteNotFoundWithId(id);
        }

        targetNote.title = title;
        targetNote.content = content;
        return await this.noteRepository.save(targetNote);
    }

    async removeNote(user: User, id: number): Promise<void> {
        let targetNote = await this.noteRepository.findOne({
            where: {
                user: {
                    id: user.id
                },
                id
            },
            relations: ["user"]
        });

        if (!targetNote) {
            throw new NoteNotFoundWithId(id);
        }

        await this.noteRepository.remove(targetNote);
    }

    async getDirectories(user: User, directory?: NoteDirectory): Promise<Array<NoteDirectory>> {
        return await this.noteDirectoryRepository.find({
            where: {
                user: {
                    id: user.id
                },
                parentDirectory: (directory ? {
                    id: directory.id
                } : null)
            },
            relations: ["user", "parentDirectory"]
        });
    }

    async getDirectoryById(user: User, id: number): Promise<NoteDirectory | undefined> {
        return await this.noteDirectoryRepository.findOne({
            where: {
                id,
                user: {
                    id: user.id
                }
            },
            relations: ["user", "parentDirectory"]
        });
    }

    async createDirectory(user: User, name: string, parentDirectory?: NoteDirectory): Promise<NoteDirectory> {
        let noteDirectory = this.noteDirectoryRepository.create({
            user,
            name,
            parentDirectory
        });
        return await this.noteDirectoryRepository.save(noteDirectory);
    }

    async updateDirectory(user: User, id: number, name: string): Promise<NoteDirectory> {
        let targetNoteDirectory = await this.noteDirectoryRepository.findOne({
            where: {
                id: id,
                user: {
                    id: user.id
                }
            },
            relations: ["user"]
        });
        if (!targetNoteDirectory) {
            throw new NoteDirectoryNotFound(id);
        }
        return this.noteDirectoryRepository.save(targetNoteDirectory);
    }

    async removeDirectory(user: User, id: number): Promise<void> {
        let targetNoteDirectory = await this.noteDirectoryRepository.findOne({
            user: {
                id: user.id
            },
            id
        });

        if (!targetNoteDirectory) {
            throw new NoteDirectoryNotFound(id);
        }

        let idCollector = (directory: NoteDirectory): number[] => {
            return [
                directory.id,
                ...directory.childDirectories?.flatMap(childDirectory => idCollector(childDirectory))
            ];
        }
        let ids = idCollector(targetNoteDirectory);
        let notes = await this.noteRepository.find({
            where: {
                parentDirectory: {
                    id: In(ids)
                },
                user: {
                    id: user.id
                }
            },
            relations: ["user", "parentDirectory"]
        });
        this.noteRepository.remove(notes);
        this.noteRepository.delete({
            id: In(ids)
        });
    }
}