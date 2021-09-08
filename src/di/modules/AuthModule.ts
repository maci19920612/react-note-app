import {asClass } from "awilix"; 
import { AuthManager } from "../../manager/AuthManager"

export type AuthModuleDefinition = {
    authManager: AuthManager
};

const module = {
    authManager: asClass(AuthManager)
};

export default module;