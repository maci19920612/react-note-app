import React from "react";
import * as awilix from "awilix";
import { AuthModule, AuthModuleType } from "./modules/AuthModule";
import { AppModule, AppModuleType } from "./modules/AppModule";
import { StorageModule, StorageModuleType } from "./modules/StorageModule";

export type AppComponent = AuthModuleType & AppModuleType & StorageModuleType;

export class ComponentContainerImpl {
    private container: awilix.AwilixContainer<AppComponent>
    constructor() {
        this.container = awilix.createContainer();
        let modules = [
            new AppModule(),
            new AuthModule(),
            new StorageModule()
        ];
        modules.forEach(module => module.register(this.container));
    }
    
    get(): AppComponent {
        return this.container.cradle;
    }
}

export const ComponentContainer = new ComponentContainerImpl();

export const DependencyInjectionContext = React.createContext(ComponentContainer);