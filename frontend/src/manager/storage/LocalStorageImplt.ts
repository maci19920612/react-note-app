import { IStorage } from "./IStorage";

export class LocalStorage implements IStorage {
    async set(key: string, value: string, expiration: Date): Promise<void> {
        localStorage.setItem(key, JSON.stringify({
            value,
            expiration: expiration.toUTCString()
        }));
    }

    async get(key: string): Promise<string | undefined> {
        try {
            let targetItem = localStorage.getItem(key);
            if (!targetItem) {
                throw new Error(`Target item not found in local storage, key: ${key}`);
            }
            let entry = JSON.parse(targetItem);
            let expiration = new Date(entry.expiration);
            let currentDate = new Date();
            if (expiration >= currentDate) {
                throw new Error(`This entry is already expired: ${expiration}, key: ${key}`);
            }
            return entry.value;
        } catch (error) {
            localStorage.removeItem(key);
            console.error(error);
            return undefined;
        }
    }

    async remove(key: string): Promise<void> {
        localStorage.removeItem(key);
    }

    async clear(): Promise<void> {
        localStorage.clear();
    }

    isSupported(): boolean {
        return !!localStorage;
    }
}