export interface IStorage {
    set(key: string, value: string, expiration: Date): Promise<void>
    get(key: string): Promise<string | undefined>
    isSupported() : boolean;
}