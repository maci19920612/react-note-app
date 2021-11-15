import {IModule} from "./base/IModule";
import {asClass, AwilixContainer} from "awilix";
import {NoteManager} from "../../manager/NoteManager";

export type NoteModuleType = {
    noteManager: NoteManager
};

export class NoteModule implements IModule{
    register(container: AwilixContainer) {
        container.register({
            noteManager: asClass(NoteManager).singleton()
        });
    }
}