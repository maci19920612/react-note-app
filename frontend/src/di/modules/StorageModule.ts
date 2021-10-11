import { asClass, asFunction, AwilixContainer } from "awilix";
import { CookieStorage as CookieStorageImpl } from "../../manager/storage/CookieStorageImpl";
import { IStorage } from "../../manager/storage/IStorage";
import { LocalStorage as LocalStorageImpl } from "../../manager/storage/LocalStorageImplt";
import { IModule } from "./base/IModule";

export type StorageModuleType = {
    localStorageImpl: IStorage,
    cookieStorageImpl: IStorage,
    storages: Array<IStorage>
}

export class StorageModule implements IModule {
    register(container: AwilixContainer<any>) {
        let components = {
            localStorageImpl: asClass(LocalStorageImpl),
            cookieStorageImpl: asClass(CookieStorageImpl),
            storageManager: asClass(StorageManager),
        }
        if (this.getPlatform() == this.PLATFORM_WEB) {
            components["storages"] = asFunction(function (localStorageImpl, cookieStorageImpl) {
                return [localStorageImpl, cookieStorageImpl];
            });
        } else {
            throw new Error(`Not supported platform: `);
        }
        container.register(components);
    }

    private getPlatform(): string {
        return this.PLATFORM_WEB;
    }

    private PLATFORM_WEB = "WEB"
}