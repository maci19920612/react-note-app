import { CookieStorage } from "./CookieStorageImpl";
import { IStorage } from "./IStorage";
import { LocalStorage } from "./LocalStorageImplt";
export class StorageManager {
    private storage: IStorage
    constructor(storages: Array<IStorage>) {
        this.storage = storages.find(storage => storage.isSupported());
        if (!this.storage) {
            throw new Error(`No supported storage implementation is found`);
        }
    }

    async set(key: string, value: string, expiration?: Date): Promise<void> {
        if (!expiration) {
            expiration = new Date(Date.now() + 1000 * 60 * 60 * 24);
        }
        await this.storage.set(key, value, expiration);
    }
    
    async get(key: string): Promise<string | undefined> {
        return await this.storage.get(key);
    }
    
    async remove(key: string) : Promise<void>{
        await this.storage.remove(key);
    }

    async clear() : Promise<void>{
        await this.storage.clear();
    }
}