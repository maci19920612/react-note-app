export class AuthManager{
    async login(username: string, password: string) : Promise<void>{
        alert("Login " + username + password);
    }
    async loginAsGuest() : Promise<void>{

    }
    
    async register(username: string, password: string) : Promise<void>{

    }

    async logout(){

    }
}