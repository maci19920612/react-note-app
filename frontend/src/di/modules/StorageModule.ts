import { asClass, asFunction, asValue, AwilixContainer } from "awilix";
import { CookieStorage as CookieStorageImpl } from "../../manager/storage/CookieStorage";
import { IStorage } from "../../manager/storage/IStorage";
import { LocalStorage as LocalStorageImpl } from "../../manager/storage/LocalStorage";
import { IModule } from "./base/IModule";
import { StorageManager } from "../../manager/storage/StorageManager";

export type StorageModuleType = {
    localStorageImpl: IStorage,
    cookieStorageImpl: IStorage,
    storages: Array<IStorage>
}

export class StorageModule implements IModule {
    register(container: AwilixContainer<any>) {
        let components = {
            localStorageImpl: asClass(LocalStorageImpl).singleton(),
            cookieStorageImpl: asClass(CookieStorageImpl).singleton(),
            storageManager: asClass(StorageManager).singleton(),
            randomExaple: asValue("example2")
        }
        if (this.getPlatform() == this.PLATFORM_WEB) {
            components["storages"] = asFunction(function (localStorageImpl, cookieStorageImpl) {
                return [localStorageImpl, cookieStorageImpl];
            }).singleton();
        } else {
            throw new Error(`Not supported platform: `);
        }
        console.log("StorageModule components", components);
        container.register(components);
    }

    private getPlatform(): string {
        return this.PLATFORM_WEB;
    }

    private PLATFORM_WEB = "WEB"
}