import React from "react";
import * as awilix from "awilix";
import AuthModule, { AuthModuleDefinition } from "./modules/AuthModule";

export type AppComponent = AuthModuleDefinition;

export class ComponentContainerImpl{
    private container: awilix.AwilixContainer<AppComponent>
    constructor(){
        this.container = awilix.createContainer();
        let modules = [
            AuthModule
        ];
        modules.forEach(module => this.container.register(module));
    }

    get() : AppComponent {
        return this.container.cradle;
    }
}

export const ComponentContainer = new ComponentContainerImpl();

export const DependencyInjectionContext = React.createContext(ComponentContainer);