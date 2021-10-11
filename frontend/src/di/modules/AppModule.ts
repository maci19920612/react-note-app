import { AwilixContainer } from "awilix";
import { IModule } from "./base/IModule";

export type AppModuleType = {};

export class AppModule implements IModule {
    register(container: AwilixContainer<any>) {
        //Empty implemnentation
    }
}