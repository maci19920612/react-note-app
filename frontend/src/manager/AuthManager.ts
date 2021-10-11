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
        this.storageManager.set(KEY_TOKEN, "debug-token");
    }

    async register(username: string, password: string): Promise<void> {

    }

    async logout() {
        this.storageManager.set(KEY_TOKEN, "")
        //TODO: Logout
    }
}