import { StorageManager } from "./storage/StorageManager";

const KEY_TOKEN = "token"

export class AuthManager {
    constructor(
        private storageManager: StorageManager
    ) { }
    async login(username: string, password: string): Promise<void> {
        if (username != "admin" || password != "admin") {
            throw new Error("Invalid credentials provided.");
        }
        await this.storageManager.set(KEY_TOKEN, "debug-token");
    }

    async register(username: string, password: string): Promise<void> {

    }

    async logout() {
        await this.storageManager.remove(KEY_TOKEN);
    }

    async isLoggedIn() : Promise<boolean>{
        return !!this.storageManager.get(KEY_TOKEN);
    }

}