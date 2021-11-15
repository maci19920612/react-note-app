import { IModule } from "./base/IModule";
import {asClass, AwilixContainer} from "awilix";
import {ApiManager} from "../../api/ApiManager";

export class ApiModule implements IModule{
    register(container: AwilixContainer) {
        container.register({
            apiManager: asClass(ApiManager).singleton()
        })
    }
}