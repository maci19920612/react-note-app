import React from "react";
import * as awilix from "awilix";
import { AuthModule, AuthModuleType } from "./modules/AuthModule";
import { AppModule, AppModuleType } from "./modules/AppModule";
import { StorageModule, StorageModuleType } from "./modules/StorageModule";
import {ApiModule} from "./modules/ApiModule";
import {NoteModule, NoteModuleType} from "./modules/NoteModule";

export type AppComponent = AuthModuleType & AppModuleType & StorageModuleType & NoteModuleType;

export class ComponentContainerImpl {
    private container: awilix.AwilixContainer<AppComponent>
    constructor() {
        this.container = awilix.createContainer({
            injectionMode: awilix.InjectionMode.CLASSIC
        });
        let modules = [
            //new AppModule(),
            new StorageModule(),
            new AuthModule(),
            new ApiModule(),
            new NoteModule(),
        ];
        modules.forEach(module => module.register(this.container));
    }
    
    get(): AppComponent {
        return this.container.cradle;
    }
}

export const ComponentContainer = new ComponentContainerImpl();

export const DependencyInjectionContext = React.createContext(ComponentContainer);