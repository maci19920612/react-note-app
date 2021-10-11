import { IStorage } from "./IStorage";

export class CookieStorage implements IStorage {

    async set(key: string, value: string, expiration: Date): Promise<void> {
        this.setCookie(key, value, expiration.toUTCString());
    }

    async get(key: string): Promise<string> {
        return this.getCookie(key);
    }

    async remove(key: string): Promise<void> {
        this.setCookie(key, "", (new Date(Date.now() - 1000)).toUTCString());
    }

    async clear(): Promise<void> {
        document.cookie = "";
    }

    private setCookie(cname, cvalue, expiration: string) {
        let expires = "expires=" + expiration;
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }


    private getCookie(cname): string {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    isSupported(): boolean {
        return true;
    }
}