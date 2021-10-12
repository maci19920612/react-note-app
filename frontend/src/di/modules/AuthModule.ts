import { asClass, asValue, AwilixContainer } from "awilix";
import { AuthManager } from "../../manager/AuthManager"
import { IModule } from "./base/IModule"

export type AuthModuleType = {
    authManager: AuthManager
};

export class AuthModule implements IModule{
    register(container: AwilixContainer<any>) {
        container.register({
            authManager: asClass(AuthManager).singleton()
        });
    }
}