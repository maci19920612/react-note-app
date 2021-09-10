import { asClass } from "awilix";
import { AuthManager } from "../../manager/AuthManager"

export type AuthModuleDefinition = {
    authManager: AuthManager
};

const m = {
    authManager: asClass(AuthManager)
};

export default m;